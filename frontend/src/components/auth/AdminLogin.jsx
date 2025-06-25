import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "@/redux/adminSlice"; // ✅ import the action

const AdminLogin = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { admin } = useSelector((store) => store.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${ADMIN_API_END_POINT}/login`, input, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAdmin(res.data.admin));
        toast.success(res.data.message);
        navigate("/elevateu/admin"); // Navigate to Admin dashboard
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      toast.success("Already logged in");
      navigate("/elevateu/admin");
    }
  }, [admin, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] sm:w-[400px] bg-white p-6 shadow rounded-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-[#3b66ff]">
          Admin Login
        </h1>

        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          required
          className="mb-4"
        />

        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          required
          className="mb-4"
        />

        <Button
          type="submit"
          className="w-full bg-[#3b66ff] text-white cursor-pointer"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
