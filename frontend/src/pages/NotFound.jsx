import React from "react";
import { Link } from "react-router-dom";
import { Home, Compass, ArrowLeft } from "lucide-react";
import Button from "../components/design-system/Button";
import Card from "../components/design-system/Card";
import Pill from "../components/design-system/Pill";

const NotFound = () => {
  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full flex flex-col items-center gap-6">
        <Pill variant="marigold" size="md">
          404 Error
        </Pill>

        <h1 className="text-[72px] sm:text-[96px] font-bold tracking-[-4px] leading-none text-[#000000]">
          404
        </h1>

        <Card variant="white" className="p-8 w-full flex flex-col gap-4 text-center">
          <h2 className="text-[22px] font-bold text-[#000000]">
            This page went somewhere else.
          </h2>
          <p className="text-[14px] text-[#615d59] leading-relaxed">
            The page or study group you're looking for doesn't exist or may have been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to="/dashboard/home" className="w-full">
              <Button variant="primary" fullWidth icon={Home}>
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/find-groups" className="w-full">
              <Button variant="ghost" fullWidth icon={Compass}>
                Explore Groups
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
