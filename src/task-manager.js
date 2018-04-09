import createQueue from './create-queue';
import pdfProcessorAsync from './processors/pdf-img';

const pdfQueue = createQueue('PDF_TO_IMG');

pdfQueue.process(2, (job) => {
  console.log('\nProcess:', job.data);

  // Processors can also return promises instead of using the done callback
  return pdfProcessorAsync(job);
});

pdfQueue.on('completed', (job, result) => {
  console.log('Result:', result);
});

pdfQueue.add({ 1: 1 });
pdfQueue.add({ 2: 2 });
pdfQueue.add({ 3: 3 });
