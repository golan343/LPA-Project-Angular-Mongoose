const nodemailer = require("nodemailer");
const fs = require("fs");

class EmailUtil {
  transporter;
  options;
  constructor() {
    // create reusable transporter object using the default SMTP transport
    this.transporter = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      // port: 587,
      // secure: false, // true for 465, false for other ports
      service : 'gmail',
      auth: {
        user: "info@lowpriceauction.com", // generated ethereal user
        pass: "LPA123info", // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false 
      }
    });
  }
  async send(from, to, subject, text, callback) {
    // const temp = new emailTemplates();
    // const content = await temp.setTemplate(subject, text);
    this.options = new mailOptions(from, to, subject, text);
    if (typeof callback == "function") {
      return this.transporter.sendMail(this.options, callback);
    }
  }
  async sendAsync() {
    return await this.transporter.sendMail(this.options);
  }
}

class mailOptions {
  from = "";
  to = "";
  subject = "";
  text = "";
  constructor(from, to, subject, text) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
  }
}
class emailTemplates {
  constructor() {}
  async setTemplate(title, content) {
    let data = await fs.readFileSync("./html-template/template.html", "utf8");
    data = data.replace("#title#", title);
    data = data.replace("#content#", content);
    return data;
  }
}
module.exports = {
  EmailUtil,
  mailOptions,
  emailTemplates,
};
