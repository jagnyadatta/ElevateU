import { ADMIN_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../ui/Loader";
import ApprovedLoader from "../ui/ApprovedLoader";

const CounsellorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [counsellor, setCounsellor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approveLoader, setApproveLoader] = useState(false);

  const fetchCounsellor = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${ADMIN_API_END_POINT}/counsellor/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setCounsellor(res.data.counsellor);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setApproveLoader(true);
      const res = await axios.put(
        `${ADMIN_API_END_POINT}/approve/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Counsellor approved successfully");
        navigate("/elevateu/admin"); // back to dashboard
      }
    } catch (err) {
      toast.error("Approval failed");
    } finally {
      setApproveLoader(false);
    }
  };

  useEffect(() => {
    fetchCounsellor();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#cbd3e9] fixed top-[49%] left-[49%] p-2 rounded">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-[#3b66ff] mb-6">
        Counsellor Details
      </h2>
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex items-center gap-6">
          <img
            src={counsellor?.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <p>
              <strong>Name:</strong> {counsellor?.name}
            </p>
            <p>
              <strong>Email:</strong> {counsellor?.email}
            </p>
            <p>
              <strong>College:</strong> {counsellor?.collegeName}
            </p>
            <p>
              <strong>Branch:</strong> {counsellor?.branch}
            </p>
            <p>
              <strong>Year:</strong> {counsellor?.passoutYear}
            </p>
            <p>
              <strong>Status:</strong> {counsellor?.verification}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#3b66ff]">
            Uploaded Documents
          </h3>
          <div className="flex gap-4 flex-wrap">
            <h3 className="text-lg font-semibold">College Id:</h3>
            <img
              src={counsellor?.collegeIdCard}
              alt="College ID"
              className="w-full max-h-70 object-contain rounded-lg border"
            />
            <h3 className="text-lg font-semibold">Rank Card:</h3>
            <img
              src={counsellor?.rankCard}
              alt="Rank Card"
              className="w-full max-h-70 object-contain rounded-lg border"
            />
          </div>
        </div>
        {counsellor?.verification === "pending" && (
          <>
            <button
              onClick={handleApprove}
              className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md mr-5 cursor-pointer"
            >
              {approveLoader ? <ApprovedLoader /> : "Approve Counsellor"}
            </button>
            <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-400 text-white rounded-md mr-5 cursor-pointer">
              {approveLoader ? <ApprovedLoader /> : "Reject Counsellor"}
            </button>
          </>
        )}
        <button
          onClick={() => navigate("/elevateu/admin")}
          className="mb-6 px-4 py-2 hover:bg-blue-300 text-sm rounded-md bg-[#3b66ff] text-white cursor-pointer hover:text-black"
        >
          ← Back to Dashboard
        </button>{" "}
        &nbsp; &nbsp;
        <button className="mb-6 px-4 py-2 text-sm rounded-md bg-red-600 text-white cursor-pointer hover:bg-red-400">
          Remove Counsellor
        </button>
      </div>
    </div>
  );
};

export default CounsellorDetails;
