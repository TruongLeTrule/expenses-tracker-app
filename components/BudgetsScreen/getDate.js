export default getDate = (interval) => {
    const currentDate = new Date();
    const firstDay = new Date(currentDate);
    const lastDay = new Date(firstDay);

    const setTime = (first, last) => {
      first.setHours(0, 0, 0, 0);
      last.setHours(23, 59, 59, 999);
    };
    // Adjust the date based on the specified interval
    switch (interval) {
      case 'Weekly':
        firstDay.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        lastDay.setDate(firstDay.getDate() + 6);
        break;
      case 'Monthly':
        firstDay.setMonth(currentDate.getMonth(), 1);
        lastDay.setMonth(firstDay.getMonth() + 1, 0);
        break;
      case 'Quarterly':
        firstDay.setMonth(Math.floor(currentDate.getMonth() / 3) * 3 , 1);
        lastDay.setMonth(firstDay.getMonth() + 3, 0);
        break;
      case 'Half Yearly':
        firstDay.setMonth(currentDate.getMonth() < 6 ? 0 : 6, 1);
        lastDay.setMonth(firstDay.getMonth() + 6, 0);
        break;
      case 'Yearly':
        firstDay.setMonth(0, 1);
        lastDay.setMonth(11, 31);
        break;
      default:
        // Default to weekly if no or invalid interval provided
        firstDay.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        break;
    }
    setTime(firstDay, lastDay);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Ho_Chi_Minh',
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedFirstDay = formatter.format(firstDay);
    const formattedLastDay = formatter.format(lastDay);

    return [formattedFirstDay, formattedLastDay];
  };

