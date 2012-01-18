nSamples = 1000000;
nValues = size(S, 1);

gaussian_vals = randn(nSamples, nValues) * A;

new_cov = cov(gaussian_vals);

diff = new_cov - K