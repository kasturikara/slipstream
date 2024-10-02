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

export async function getTotalPerMonth(id: string, bulan: string) {
  try {
    // Asumsikan 'bulan' dalam format 'YYYY-MM'
    const firstDayOfMonth = bulan;
    const firstDayOfNextMonth = new Date(
      new Date(firstDayOfMonth).setMonth(
        new Date(firstDayOfMonth).getMonth() + 1
      )
    )
      .toISOString()
      .slice(0, 10); // Dapatkan hari pertama dari bulan berikutnya

    const { data, error: errorSupa } = await supabase
      .from("transaksi")
      .select("*")
      .eq("user_id", id)
      .gte("tanggal", firstDayOfMonth) // Ambil mulai dari hari pertama bulan ini
      .lt("tanggal", firstDayOfNextMonth); // Ambil hingga sebelum hari pertama bulan berikutnya

    if (errorSupa) {
      console.error("Supabase error:", errorSupa);
      return null;
    }

    // Hitung total income dan expense
    let total_income = 0;
    let total_expense = 0;

    data?.forEach((item) => {
      if (item.tipe === "income") {
        total_income += item.jumlah; // Tambah jumlah ke total_income
      } else if (item.tipe === "expense") {
        total_expense += item.jumlah; // Tambah jumlah ke total_expense
      }
    });

    return {
      total_income,
      total_expense,
    }; // Kembalikan objek dengan total_income dan total_expense
  } catch (error) {
    console.error("Get balance failed:", error);
    return null;
  }
}

export async function getHistory(id: string) {
  try {
    const { data, error: errorHistory } = await supabase
      .from("transaksi")
      .select("*")
      .eq("user_id", id)
      .order("tanggal", { ascending: false });

    if (!data || errorHistory) {
      console.log("Error get history: ", errorHistory);
      return null;
    }

    return data;
  } catch (error) {
    console.log("Error get history: ", error);
  }
}
