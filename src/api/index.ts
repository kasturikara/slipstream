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
      .order("id", { ascending: false });

    if (!data || errorHistory) {
      console.log("Error get history: ", errorHistory);
      return null;
    }

    return data;
  } catch (error) {
    console.log("Error get history: ", error);
  }
}

interface InsertData {
  user_id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
}
export async function insertTransactions(input: InsertData) {
  try {
    // Insert transaksi baru ke dalam tabel 'transaksi'
    const { error: errorInsert } = await supabase.from("transaksi").insert({
      user_id: input.user_id,
      tipe: input.type,
      deskripsi: input.description,
      jumlah: Number(input.amount),
      tanggal: input.date,
    });

    if (errorInsert) {
      console.log("Error insert transaction: ", errorInsert);
      await Swal.fire(
        "Error",
        "Failed to insert transaction. Please try again later.",
        "error"
      );
      return null;
    }

    // Ambil data total dari user saat ini
    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("total")
      .eq("id", input.user_id)
      .single();

    if (userError) {
      console.log("Error fetching user total: ", userError);
      return null;
    }

    const currentTotal = Number(userData.total) || 0; // Set total saat ini (jika null, set jadi 0)

    // Tentukan apakah transaksi adalah income atau expense, dan update total user
    const newTotal =
      input.type === "income"
        ? currentTotal + Number(input.amount)
        : currentTotal - Number(input.amount);

    // Update kolom total di tabel 'user'
    const { error: updateError } = await supabase
      .from("user")
      .update({ total: newTotal })
      .eq("id", input.user_id);

    if (updateError) {
      console.log("Error updating user total: ", updateError);
      return null;
    }

    // update user di localstorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.total = newTotal;
    localStorage.setItem("user", JSON.stringify(user));

    // Jika semuanya berhasil
    await Swal.fire("Success", "Transaction inserted successfully!", "success");
    window.location.href = "/";
  } catch (error) {
    console.log("Error insert transaction: ", error);
  }
}

export async function getUser(id: string) {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", id)
      .single();

    if (!data || error) {
      console.log("Error get user: ", error);
      return null;
    }

    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log("Error get user: ", error);
  }
}
