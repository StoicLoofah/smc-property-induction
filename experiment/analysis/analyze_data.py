import _mysql
import scipy.stats

osherson_ratings = [0, .06, .23, .26, .32, .4, .41, .43, .48, .54, .57, .61, .63, .73, .75, .79, .14, .27, .3, .31, .35, .4, .47, .49, .58, .62, .64, .68, .7, .75, .8]

arguments = [[],
             [50, 24], # .06
             [25, 20], # .23
             [27, 24], # .26
             [27, 50], # .32
             [25, 27], # .4
             [20, 24], # .41
             [25, 24], # .43
             [20, 44], # .48
             [27, 19], # .54
             [19, 28], # .57
             [20, 19], # .61
             [20, 28], # .63
             [49, 50], # .73
             [49, 20], # .75
             [49, 25], # .79
             [49, 19, 28], # 0.14, garden path (2 large, 1 medium)
             [7, 50, 24], # 0.27, garden path (2 water, 1 land)
             [25, 20, 24], # 0.3, garden path (2 primate, 1 not)
             [44, 19, 28], # 0.31, garden path (2 large, 1 small)
             [44, 27, 24], # 0.35, garden path (2 small, 1 water)
             [49, 25, 19], # 0.4, general (Nothing)
             [7, 27, 19], # 0.47, general (Nothing)
             [7, 50, 19], # 0.49, general (2 land, 1 water?)
             [20, 44, 19], # 0.58, general (2 African, 1 generic?)
             [25, 27, 19], # 0.62, general (2 African, 1 generic?)
             [7, 20, 27], # 0.64, general (Nothing)
             [27, 50, 28], # 0.68 general (Nothing)
             [44, 24, 19], # 0.7 general (Nothing)
             [7, 25, 24], # 0.75 general (Nothing)
             [25, 27, 50], # 0.8 general (Nothing)
             [1, 40, 39], #all specific, 2 pairs of similar animals
             [48, 47, 46], #all specific, full diversity
             [21, 37, 51], #general is a premise, other 2 are similar, conclusion is dissimilar
             [39, 19, 51], #general is a premise, other 2 are different, conclusion is similar to 1 of them
             [3, 9, 18], #consistent premises, Coley
             [13, 15, 43], #consistent premises, Coley
             [3, 18, 34], #garden path, Coley
             [34, 44, 47], #garden path, Coley
             [5, 8, 19], #2 dogs + elephant as premises, dog conclusion
             [25, 44], #catch
             [20, 50], #catch
             ]

def get_osherson_rating(index):
    if index >= len(osherson_ratings):
        return -1
    return osherson_ratings[index]

def rating_to_value(rating):
    return int(rating) / 9.0

def get_stats_from_ordering(ordering):
    ratings = [data_point['rating'] for data_point in ordering]
    ratings_sum = sum(ratings)
    count = len(ordering)
    
    return {'average_rating': ratings_sum/count, 'count': count, 'total_rating': ratings_sum, 'ratings': ratings}

def get_stats_from_trial(trial):
    ratings = []
    ratings_sum = 0
    count = 0

    for ordering in trial:
        stats = get_stats_from_ordering(trial[ordering])
        count += stats['count']
        ratings_sum += stats['total_rating']
        ratings.extend(stats['ratings'])

    return {'average_rating': ratings_sum/count, 'count': count, 'total_rating': ratings_sum, 'ratings': ratings}

def main():
    
    f_summary = open('summary.csv', 'w')
    f_summary.write('Trial Num, Subject Avg Rating, Std Dev, Osherson Rating\n')
    f_orderings = open('orderings.csv', 'w')
    f_orderings.write('Animal indexes, Subject Avg Rating, Counts\n')
    f_comments = open('comments.csv', 'w')
    f_explanations = open('explanations.csv', 'w')
    f_compare_trials = open('comparison.csv', 'w')

    num_trials = 39
    
    db = _mysql.connect("localhost", "USERNAME", "PASSWORD", "DB_NAME")
    
    db.query('SELECT * FROM subject')
    r = db.store_result()
    
    temp_subjects = list(r.fetch_row(0,1))
    
    subjects = []

    data_by_orderings = [{} for i in range(num_trials + 1)]
    data_by_trial = [[] for i in range(num_trials + 1)]
    ttest_between_trials = [[0] * (num_trials + 1) for i in range(num_trials + 1)]

    for subject in temp_subjects:
        if not subject['sex']:
            print('Subject %s didn\'t complete the task' % subject['id'])
            continue

        db.query('SELECT catch_passed FROM conclusion WHERE subject=%s AND catch_passed=0' % subject['id'])
        r = db.store_result()
        catch_failed = len(r.fetch_row(0,1)) > 0
        if catch_failed: #doesn't work
            print('Subject %s failed the catch' % subject['id'])
            continue

        if subject['comments']:
            f_comments.write('"%s"\n' % subject['comments'])
        if subject['explanation']:
            f_explanations.write('"%s"\n' % subject['explanation'])
        subjects.append(subject['id'])
           
        db.query('SELECT conclusion.*, trial.trial_index, trial.order_index FROM conclusion, trial WHERE conclusion.trial = trial.id AND conclusion.subject = ' + subject['id'])
        r = db.store_result()        
        conclusions = list(r.fetch_row(0,1))

        zscore = scipy.stats.zs([int(conclusion['rating']) for conclusion in conclusions])
        for i in range(0, len(zscore)):
            conclusions[i]['zscore'] = zscore[i]

        for conclusion in conclusions:
            if conclusion['animal'] != '-1' and conclusion['subject'] in subjects:
                db.query('SELECT * FROM premise WHERE trial=%s AND subject=%s ORDER BY order_index' % (conclusion['trial'], conclusion['subject']))
                r = db.store_result()
                premises = list(r.fetch_row(0,1))
                premise_ids = tuple([premise['animal'] for premise in premises])

                cur_ratings = data_by_orderings[int(conclusion['trial_index'])]

                if sorted([int(id) for id in premise_ids]) != sorted(arguments[int(conclusion['trial_index'])]):
                    print('Broken premise set %s for user %s' % (str(premise_ids), conclusion['subject']))
                    continue

                data_by_trial[int(conclusion['trial_index'])].append(conclusion['zscore'])

                if premise_ids in cur_ratings:
                    cur_ratings[premise_ids].append({'rating': conclusion['zscore']})
                else:
                    cur_ratings[premise_ids] = [{'rating': conclusion['zscore']}]

    for trial_num in range(1, num_trials + 1):
        for j in range(trial_num + 1, num_trials + 1):
            [t, p] = scipy.stats.ttest_ind(data_by_trial[trial_num], data_by_trial[j])
            ttest_between_trials[trial_num][j] = p

        if len(data_by_orderings[trial_num]) == 0:
            f_summary.write('%2d, %d, %d, %f\n' % (trial_num, 0, 0, get_osherson_rating(trial_num)))
        else:
            f_summary.write('%2d, %.4f, %.4f, %.2f\n' % (trial_num, scipy.mean(data_by_trial[trial_num]), scipy.std(data_by_trial[trial_num]), get_osherson_rating(trial_num)))

        ratings_by_ordering = [[entry['rating'] for entry in ordering] for ordering in data_by_orderings[trial_num].values()]
        [f, p] = scipy.stats.f_oneway(*ratings_by_ordering)
        print(str(f) + ' ' + str(p))

        f_orderings.write('Trial %d,%f,%f,%s\n' % (trial_num, f, p, 'SIGNIFICANT' if p < .05 else ''))
        for ordering in data_by_orderings[trial_num]:
            stats = get_stats_from_ordering(data_by_orderings[trial_num][ordering])
            f_orderings.write('"%s", %.2f, %d\n' % (list(ordering), stats['average_rating'], stats['count']))

    for row in ttest_between_trials:
        for val in row:
            if val == 0:
                f_compare_trials.write(',')
            else:
                f_compare_trials.write('%f, ' % val)
        f_compare_trials.write('\n')

main()
