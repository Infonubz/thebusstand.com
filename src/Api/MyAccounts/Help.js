import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

export const help = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}/send-inquiry`, {
      name: values.name,
      phone: 9876543213,
      email: values.email,
      message: values.message,
      terms: values.terms,
    });
    toast.success(response.data);
  } catch (err) {
    console.log(err);
  }
};
