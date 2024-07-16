import axios from "axios";

const url = "http://localhost:3001/api/v1";

class StudentService {
  getAll() {
    return axios.get(`http://localhost:3001/api/v1/students`);
  }

  get(id) {
    return axios.get(`http://localhost:3001/api/v1/students/${id}`);
  }

  getClassesRecommend() {
    return axios.get(`http://localhost:3001/api/v1/classes`);
  }

  getStudentsByClass(classId) {
    return axios.get(
      `http://localhost:3001/api/v1/students?classId=${classId}`
    );
  }

  async getStudentReportOverviewByClass(classId) {
    const res = await axios.get(
      `http://localhost:3001/api/v1/student-report/total/${classId}`
    );
    return res.data.ResponseResult.Result;
  }

  getStudentReportOverview() {
    return axios.get(`http://localhost:3001/api/v1/student-report/total`);
  }

  async getTopStudents({ classid } = {}) {
    let urlString =
      "http://localhost:3001/api/v1/student-report/total/?istop=true";
    urlString = classid ? urlString + "&classid=" + classid : urlString;
    const res =  await axios.get(urlString);
    return res.data.ResponseResult.Result;
  }

  getStudentReportDailyMonthly({
    studentId = null,
    month = null,
    year = null,
    date = null,
  } = {}) {
    let queryStr = "";
    if (month) queryStr += "&month=" + month;
    if (year) queryStr += "&year=" + year;
    if (date) queryStr += "&date=" + date;
    return axios.get(
      `http://localhost:3001/api/v1/student-report/?studentid=` +
        studentId +
        queryStr
    );
  }
  getStudentReportTotal(studentId) {
    return axios.get(
      `http://localhost:3001/api/v1/student-report/monthly/` + studentId
    );
  }

  getStudiedDate(studentId) {
    return axios.get(
      `http://localhost:3001/api/v1/student-report/date/` + studentId
    );
  }
}

export default new StudentService();

export class ClassService {
  static getAll() {
    return axios.get(`http://localhost:3001/api/v1/class`);
  }

  static get(id) {
    return axios.get(`http://localhost:3001/api/v1/class/${id}`);
  }

  static create(data) {
    return axios.post(`http://localhost:3001/api/v1/class`, data);
  }

  static async getLineChartData({
    date = null,
    month = null,
    year = null,
    isPeriod = false,
    classId = "",
  } = {}) {
    console.log("class chart data call");
    try {
      if (isPeriod) {
        console.log("url line chart", `${url}/center-report/monthly`);
        const response = await axios.get(`${url}/center-report/monthly`);
        const reports = response.data.ResponseResult.Result;
        console.log("centerReport:", reports);
        const pieChart = reports.map((report) => {
          return {
            key: report["_id"]["Month"],
            value: report["AvgCenterScore"],
          };
        });
        pieChart.sort((a, b) => a.key - b.key);
        return pieChart;
      } else {
        let query = "?classId=" + classId;
        if (date) query = query + "&date=" + date.slice(0, 10);
        if (month) query = query + "&month=" + month;
        if (year) query = query + "&year=" + year;

        if (isPeriod) query = "/monthly";

        console.log("url line chart", `${url}/class-report` + query);
        const response = await axios.get(`${url}/class-report` + query);
        const reports = response.data.ResponseResult.Result.reports;

        reports.sort((a, b) => {
          return Date.parse(a.Date) - Date.parse(b.Date);
        });
        //extra data for line chart
        const lineChartData = reports.map((report) => {
          const dateReport = new Date(report.Date);
          return {
            key: `${dateReport.getDate().toString().padStart(2, "0")}/${(
              dateReport.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${dateReport.getFullYear().toString()}`,
            value: report.ClassScore,
          };
        });
        return lineChartData;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async getPieChartData({ classId = null, month = null, date = null, isPeriod = null}={}) {
    try{
       console.log("getPieChartData month date", month, date);
       if(date){
        console.log("date here");
        console.log(
          "url pie chart class date",
          `${url}/class-report?classId=${classId}` +
            "&date=" +
            date.slice(0, 10)
        );
        let currentReport;
        const response = await axios.get(
           `${url}/class-report?classId=${classId}` +
             "&date=" +
             date.slice(0, 10)
        );
        const reports = response.data.ResponseResult.Result.reports;
        reports.forEach((report) => {
          const reportDate = report.Date.slice(0, 10);
          date = date.slice(0, 10);
          console.log("current date", date, reportDate);
          if (reportDate === date) currentReport = report;
        });
        const data = [
          { name: "Good", value: currentReport["GoodLevel"] },
          { name: "Medium", value: currentReport["MediumLevel"] },
          { name: "Not-Good", value: currentReport["BadLevel"] },
        ];
        return data;
       }else if(month){
        console.log(
          "url pie chart month",
          `${url}/student-report/monthly/?month=${month}&classid=${classId}`
        );
        const response = await axios.get(
          `${url}/student-report/monthly/?month=${month}&classid=${classId}`
        );
        const reports = response.data.ResponseResult.Result.Reports;

        let goodNumber = 0;
        let mediumNumber = 0;
        let badNumber = 0;
        reports.forEach((report) => {
          if (report.AvgTotalScore >= 80) goodNumber++;
          else if (report.AvgTotalScore < 80 && report.AvgTotalScore >= 65)
            mediumNumber++;
          else badNumber++;
        });
        const data = [
          { name: "Good", value: goodNumber },
          { name: "Medium", value: mediumNumber },
          { name: "Not-Good", value: badNumber },
        ];
        return data;
       }else{
         console.log(
           "url pie chart period",
           `${url}/student-report/monthly/?classid=${classId}`
         );
         const response = await axios.get(
           `${url}/student-report/monthly/?classid=${classId}`
         );
         const reports = response.data.ResponseResult.Result.Reports;

         let goodNumber = 0;
         let mediumNumber = 0;
         let badNumber = 0;
         reports.forEach((report) => {
           if (report.AvgTotalScore >= 80) goodNumber++;
           else if (report.AvgTotalScore < 80 && report.AvgTotalScore >= 65)
             mediumNumber++;
           else badNumber++;
         });
         const data = [
           { name: "Good", value: goodNumber },
           { name: "Medium", value: mediumNumber },
           { name: "Not-Good", value: badNumber },
         ];
         return data;
       }
    }catch(e){
      console.log("errore", e)
    }
  }

  static async getDateClass(classId) {
    try {
      const response = await axios.get(`${url}/class-report/${classId}/date`);
      return response.data.ResponseResult.Result;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async getClassInfo(classId) {
    try {
      const response = await axios.get(
        `${url}/class/get-class-info/${classId}`
      );
      return response.data.ResponseResult.Result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}



export class HomeService {
  static async getDateCenter() {
    try {
      const response = await axios.get(`${url}/center-report/date`);
      return response.data.ResponseResult.Result;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async getTopStudent() {
    try {
      const response = await axios.get(
        `${url}/student-report/total/?istop=true`
      );
      return response.data.ResponseResult.Result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async getClass() {
    try {
      const response = await axios.get(`${url}/class`);
      return response.data.ResponseResult.Result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async getPieChartData({
    month = null,
    date = null,
    isPeriod = null,
    year = 2023,
  } = {}) {
    try {
      console.log("getPieChartData month date", month, date);
      if (month) {
        console.log(
          "url pie chart month",
          `${url}/student-report/monthly/?month=${month}`
        );
        const response = await axios.get(
          `${url}/student-report/monthly/?month=${month}`
        );
        const reports = response.data.ResponseResult.Result.Reports;

        let goodNumber = 0;
        let mediumNumber = 0;
        let badNumber = 0;
        reports.forEach((report) => {
          if (report.AvgTotalScore>= 80) goodNumber++;
          else if (report.AvgTotalScore< 80 && report.AvgTotalScore>= 65)
            mediumNumber++;
          else badNumber++;
        });
        const data = [
          { name: "Good", value: goodNumber },
          { name: "Medium", value: mediumNumber },
          { name: "Not-Good", value: badNumber },
        ];
        return data;
      } else if (date) {
        console.log("date here");
        // eslint-disable-next-line no-useless-concat
        console.log(
          "url pie chart date",
          `${url}/center-report` + "?date=" + date.slice(0, 10)
        );
        let currentReport;
        const response = await axios.get(
          `${url}/center-report` + "?date=" + date.slice(0, 10)
        );
        const reports = response.data.ResponseResult.Result.reports;
        reports.forEach((report) => {
          const reportDate = report.Date.slice(0, 10);
          date = date.slice(0, 10);
          console.log("current date", date, reportDate);
          if (reportDate === date) currentReport = report;
        });
        const data = [
          { name: "Good", value: currentReport["GoodLevel"] },
          { name: "Medium", value: currentReport["MediumLevel"] },
          { name: "Not-Good", value: currentReport["BadLevel"] },
        ];
        return data;
      } else{
        console.log(
          "url pie chart period",
          `${url}/student-report/monthly/`
        );
        const response = await axios.get(
          `${url}/student-report/monthly/`
        );
        const reports = response.data.ResponseResult.Result.Reports;

        let goodNumber = 0;
        let mediumNumber = 0;
        let badNumber = 0;
        reports.forEach((report) => {
          if (report.AvgTotalScore >= 80) goodNumber++;
          else if (report.AvgTotalScore < 80 && report.AvgTotalScore >= 65)
            mediumNumber++;
          else badNumber++;
        });
        const data = [
          { name: "Good", value: goodNumber },
          { name: "Medium", value: mediumNumber },
          { name: "Not-Good", value: badNumber },
        ];
        return data;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }
  static async getLineChartData({
    date = null,
    month = null,
    isPeriod = false,
  } = {}) {
    try {
      if (isPeriod) {
        console.log("url line chart", `${url}/center-report/monthly`);
        const response = await axios.get(`${url}/center-report/monthly`);
        const reports = response.data.ResponseResult.Result;
        console.log("centerReport:", reports);
        const pieChart = reports.map((report) => {
          return {
            key: report["_id"]["Month"],
            value: report["AvgCenterScore"],
          };
        });
        pieChart.sort((a, b) => a.key - b.key);
        return pieChart;
      } else {
        let query = "";
        if (date) query = "?date=" + date.slice(0, 10);
        if (month) query = "?month=" + month;
        if (isPeriod) query = "/monthly";
        console.log("url line chart", `${url}/center-report` + query);
        const response = await axios.get(`${url}/center-report` + query);
        const reports = response.data.ResponseResult.Result.reports;

        reports.sort((a, b) => {
          return Date.parse(a.Date) - Date.parse(b.Date);
        });
        //extra data for line chart
        const lineChartData = reports.map((report) => {
          const dateReport = new Date(report.Date);
          return {
            key: `${dateReport.getDate().toString().padStart(2, "0")}/${(
              dateReport.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${dateReport.getFullYear().toString()}`,
            value: report.CenterScore,
          };
        });
        return lineChartData;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export class StatisticsService {
  // replace ${classId} with classId later
  static getAttendances(classId) {
    return axios.get(
      `http://localhost:3001/api/v1/statistics/attendances/${classId}`
    );
  }

  static getHomework(classId) {
    return axios.get(
      `http://localhost:3001/api/v1/statistics/homework/${classId}`
    );
  }

  static getPeriodicTests(classId) {
    return axios.get(
      `http://localhost:3001/api/v1/statistics/tests/${classId}`
    );
  }

  static postAttendances(classId, attendances) {
    return axios.post(
      `http://localhost:3001/api/v1/statistics/attendances/${classId}`,
      {
        attendances,
      }
    );
  }

  static postAttendancesByScanning(classId, studentIds) {
    return axios.post(
      `http://localhost:3001/api/v1/statistics/attendances/${classId}/scan`,
      {
        studentIds,
      }
    );
  }

  static postPeriodicTest(classId, tests) {
    return axios.post(
      `http://localhost:3001/api/v1/statistics/tests/${classId}`,
      {
        tests,
      }
    );
  }

  static postHomeworkTest(classId, homeworks) {
    return axios.post(
      `http://localhost:3001/api/v1/statistics/homework/${classId}`,
      {
        homeworks,
      }
    );
  }

  static deleteAttendance(classId, date) {
    return axios.delete(
      `http://localhost:3001/api/v1/statistics/attendances/${classId}`,
      {
        data: {
          date,
        },
      }
    );
  }

  static deletePeriodicTest(classId, date) {
    return axios.delete(
      `http://localhost:3001/api/v1/statistics/tests/${classId}`,
      {
        data: {
          date,
        },
      }
    );
  }

  static deleteHomework(classId, date) {
    return axios.delete(
      `http://localhost:3001/api/v1/statistics/homework/${classId}`,
      {
        data: {
          date,
        },
      }
    );
  }
}

export class TestsService {
  static getHomework(classId) {
    return axios.get(`http://localhost:3001/api/v1/tests/homework/${classId}`);
  }

  static getPeriodicTests(classId) {
    return axios.get(
      `http://localhost:3001/api/v1/tests/periodic-tests/${classId}`
    );
  }

  static addPeriodicTest(test) {
    return axios.post(`http://localhost:3001/api/v1/tests/periodic-tests/`, {
      ...test,
    });
  }
  static addHomeworkTest(test) {
    return axios.post(`http://localhost:3001/api/v1/tests/homework/`, {
      ...test,
    });
  }
}

export class TeacherService {
  static getAll() {
    return axios.get(`http://localhost:3001/api/v1/teacher`);
  }
  static get(id) {
    return axios.get(`http://localhost:3001/api/v1/teacher/${id}`);
  }
}
