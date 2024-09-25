import Swal from "sweetalert2";
import { supabase } from "../SupabaseClient";

export async function authenticateUser(credentials: {
  username: string;
  password: string;
}) {
  const { username, password } = credentials;

  try {
    const { data, error: errorSupa } = await supabase
      .from("user")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (errorSupa) {
      Swal.fire("Error", "Username or Password is wrong!", "error");
      console.error("Authentication failed:", errorSupa);
      return null;
    } else if (data) {
      Swal.fire("Success", `Login success! Welcome, ${data.nama}!`, "success");
      return data;
    }
  } catch (error) {
    console.error("Authentication failed:", error);
  }

  return null;
}
