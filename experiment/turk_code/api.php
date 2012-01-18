<?php 
      
   mysql_connect("localhost", "USERNAME", "PASSWORD") or die(mysql_error());
   mysql_select_db("DB_NAME") or die(mysql_error());     
      
   if($_POST){
      if($_POST['action'] == 'subject'){
         $query = mysql_query("INSERT INTO subject (assignment_id, hit_id, worker_id, session_time) VALUES ('" . $_POST['assignmentId'] . "','" . $_POST['hitId'] . "','" . $_POST['workerId'] . "', NOW())") or die(mysql_error());
 	 echo mysql_insert_id();
      }elseif($_POST['action'] == 'premise'){	
	 $query = mysql_query("INSERT INTO premise (text, trial, order_index, duration, subject, animal) VALUES ('".$_POST['text']."', ".$_POST['trial'].", ".$_POST['orderIndex'].", ".$_POST['time'].", ".$_POST['subjectId'].", ".$_POST['animal'].")") or die(mysql_error());
	 echo 'SUCCESS';
      }elseif($_POST['action'] == 'conclusion'){
	 $query = mysql_query("INSERT INTO conclusion (text, trial, rating, subject, animal, catch_passed) VALUES ('".$_POST['text']."', ".$_POST['trial'].", ".$_POST['rating'].", ".$_POST['subjectId'].", ".$_POST['animal'].", ".$_POST['catchPassed'].")") or die(mysql_error());
	 echo 'SUCCESS';      			       
      }elseif($_POST['action'] == 'trial'){
	 $query = mysql_query("INSERT INTO trial (order_index, trial_index, subject) VALUES (".$_POST['orderIndex'].", ".$_POST['trialIndex'].", ".$_POST['subjectId'].")") or die(mysql_error());
	 echo mysql_insert_id();
      }elseif($_POST['action'] == 'survey'){
	 $query = mysql_query("UPDATE subject SET age=".$_POST['age'].", sex='".$_POST['sex']."', explanation='".mysql_real_escape_string($_POST['explanation'])."', comments='".mysql_real_escape_string($_POST['comments'])."' where id=".$_POST['subjectId']) or die(mysql_error());
	 echo 'SUCCESS';
      }
   }
?>
