const {Email,Waitlist} = require('../models/email'); // Import the email model

const resolvers = {
  Query: {
    
    getEmails:async () =>{
        try {
            const emails = await Email.find();
            return emails.map(email=>({
                id:email._id.toString(),
                email:email.email,
            }))
        } catch (error) {
            console.error(error);
            throw new Error("failed to fetch");
        }
    },
    getWaitlistCount:async ()=>{
      try {
        const waitlist =await Waitlist.findOne();
        return waitlist? waitlist.count:0;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch ');
      }
    }
  },
  Mutation: {
    addEmail: async (_, { email }) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, message: 'Invalid email address' };
      }

      const existingEmail = await Email.findOne({ email });
      if (existingEmail) {
        return { success: false, message: 'Email already exists' };
      }

      const newEmail = new Email({ email });
      await newEmail.save();

      return { success: true, message: 'Email saved successfully' };
    },
    incrementWaitlist:async()=>{
      let waitlist=await Waitlist.findOne();
      if(!waitlist){
        waitlist=new Waitlist({count:1});
      }
      else{
        waitlist.count+=1;
      }
      await waitlist.save();
      return {success:true,count:waitlist.count};
    }
  },
};

module.exports = {resolvers};
