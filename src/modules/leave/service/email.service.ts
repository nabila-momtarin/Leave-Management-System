// src/modules/leave/email.service.ts
import nodemailer from 'nodemailer';

export class EmailService {
  private transporter;

  constructor() {
    // SMTP সার্ভার কনফিগারেশন (এখানে Gmail ব্যবহার করা হয়েছে)
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'admin@taghyeer.ai', // তোমার ইমেইল অ্যাড্রেস
        pass: 'dmrj stzv rune ehvf',         // তোমার ইমেইল পাসওয়ার্ড
      },
    });
  }

  // Email পাঠানোর মেথড
  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'admin@taghyeer.ai',
      to: ['nabila.momtarin.me@gmail.com', 
        // 'limon4n@gmail.com',
        // 'imtiazatik12@gmail.com', 
        // 'abdurrahmany418@gmail.com', 
        // 'majharul.flutter@gmail.com', 
        // 'auishee222@gmail.com', 
        // 'mamunr412@gmail.com',
        // 'rashedsarder13@gmail.com',
        // 'shamim36960@gmail.com'
       ],
      subject: 'Bonus Leave Announcement',
      text: 'Dear Team,\n\nCongratulations! You have been awarded a bonus leave for your outstanding performance. Please contact HR for more details.\n\nBest regards,\nHR Department,\nTaghyeer Technologies',
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}