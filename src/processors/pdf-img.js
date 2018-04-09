import ms from 'ms';

const TOTAL_TIME = ms('5s');
const JOB_DELAY = ms('1s');

export default job =>
  new Promise((resolve) => {
    let timePassed = 0;
    let id = setTimeout(function process() {
      if (timePassed < TOTAL_TIME) {
        timePassed += TOTAL_TIME / 5;
        job.progress(timePassed / TOTAL_TIME * 100); // eslint-disable-line no-mixed-operators
        id = setTimeout(process, JOB_DELAY);
      } else {
        clearInterval(id);
        resolve(job.data);
      }
    }, JOB_DELAY);
  });
