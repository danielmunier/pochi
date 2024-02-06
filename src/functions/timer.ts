async function timeRemaining(targetDate: string) {
    try {
 
     let nowDate = new Date().getTime()
     let finalDate = new Date(targetDate).getTime()
 
     let diffTime = finalDate - nowDate
     var days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
     var hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     var minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
 
     return {
         days: days,
         hours: hours,
         minutes: minutes,
         seconds: seconds
       };
 
    } catch(e) {
     throw new Error("Error at timeRemaining function: " + e)
    }
  }
 

export {timeRemaining}