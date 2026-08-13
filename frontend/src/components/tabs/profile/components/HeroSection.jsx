import React, { useRef } from "react";
import { Mail, Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/authSelectors";
import { updateProfilePicture, setUser } from "../../../../features/auth/authSlice";
import Avatar from "../../../design-system/Avatar";
import Pill from "../../../design-system/Pill";
import Card from "../../../design-system/Card";

const HeroSection = () => {
  const imageRef = useRef(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const userId = user?._id || user?.id;
      const res = await dispatch(
        updateProfilePicture({ id: userId, profilePicture: formData })
      );
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(
          setUser({ ...user, profilePicture: res.payload.user.profilePicture })
        );
      }
    }
  };

  const fullName = user?.fullname
    ? `${user.fullname.firstname || ""} ${user.fullname.lastname || ""}`.trim()
    : user?.username || "Student";

  return (
    <Card variant="white" className="p-8 mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <Avatar
            src={user?.profilePicture}
            name={fullName}
            size="xl"
            borderColor="#0075de"
          />
          <input
            ref={imageRef}
            type="file"
            name="profilePicture"
            id="profilePicture"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#0075de] text-white hover:bg-[#097fe8] cursor-pointer shadow-none transition-colors"
            title="Upload avatar"
          >
            <Pencil className="w-3.5 h-3.5" />
          </label>
        </div>

        <div className="text-center sm:text-left flex flex-col gap-1.5">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h1 className="text-[28px] sm:text-[36px] font-bold text-[#000000] tracking-[-0.8px]">
              {fullName}
            </h1>
            <Pill variant="sky" size="sm">
              Member
            </Pill>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-[14px] text-[#615d59]">
            <Mail className="w-4 h-4 text-[#757575]" />
            <span>{user?.email || "No email linked"}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HeroSection;
