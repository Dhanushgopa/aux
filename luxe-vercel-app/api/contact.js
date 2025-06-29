import connectDB from '../src/lib/mongodb.js';
import { Contact } from '../src/lib/models.js';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'POST':
      try {
        const { name, email, phone, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !message) {
          return res.status(400).json({ error: 'Missing required fields: name, email, and message are required' });
        }

        const contact = new Contact({
          name,
          email,
          phone: phone || '',
          message
        });

        await contact.save();
        res.status(201).json(contact);
      } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Failed to create contact' });
      }
      break;

    case 'GET':
      try {
        const contacts = await Contact.find({}).sort({ created_at: -1 });
        res.status(200).json(contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}