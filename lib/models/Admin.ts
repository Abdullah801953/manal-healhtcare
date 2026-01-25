import mongoose, { Schema, Model } from 'mongoose';

export interface IAdmin {
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  lastLogin?: Date;
}

const AdminSchema = new Schema<IAdmin>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: 'admin',
    enum: ['admin', 'super_admin']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLogin: { 
    type: Date 
  }
});

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
