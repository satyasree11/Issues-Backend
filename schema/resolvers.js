const { Email, Waitlist } = require('../models/email'); // Import the email model

const resolvers = {
  Query: {
    // Fetch all emails and their associated custom problems
    getEmails: async () => {
      try {
        const emails = await Email.find();
        return emails.map((email) => ({
          id: email._id.toString(),
          email: email.email,
          customProbelms: email.customProbelms || [],
        }));
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch emails');
      }
    },
    // Fetch the current waitlist count
    getWaitlistCount: async () => {
      try {
        const waitlist = await Waitlist.findOne();
        return waitlist ? waitlist.count : 0;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch waitlist count');
      }
    },
  },
  Mutation: {
    // Add an email with custom problems
    addEmail: async (_, { email, customProbelms }) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return { success: false, message: 'Invalid email address' };
      }

      try {
        const existingEmail = await Email.findOne({ email });

        if (existingEmail) {
          return {
            success: false,
            message: 'Email already exists',
          };
        }

        const newEmail = new Email({
          email,
          customProbelms: customProbelms || [],
        });

        await newEmail.save();

        return {
          success: true,
          message: 'Email and problems saved successfully',
          email: {
            id: newEmail._id.toString(),
            email: newEmail.email,
            customProbelms: newEmail.customProbelms,
          },
        };
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message: 'Failed to save email and problems',
        };
      }
    },
    // Increment the waitlist count
    incrementWaitlist: async () => {
      try {
        let waitlist = await Waitlist.findOne();

        if (!waitlist) {
          waitlist = new Waitlist({ count: 1 });
        } else {
          waitlist.count += 1;
        }

        await waitlist.save();

        return {
          success: true,
          count: waitlist.count,
          message: 'Waitlist count incremented successfully',
        };
      } catch (error) {
        console.error(error);
        return {
          success: false,
          count: 0,
          message: 'Failed to increment waitlist count',
        };
      }
    },
  },
};

module.exports = { resolvers };
