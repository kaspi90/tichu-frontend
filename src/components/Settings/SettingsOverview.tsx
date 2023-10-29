import classNames from "classnames";
import Input from "../Forms/InputForms/InputText";
import Button from "../Buttons/button";
import authServices from "@/services/auth.services";
import { useEffect, useRef, useState } from "react";
import { User, UserUpdateInput } from "@/types/user";
import UserService from "@/services/user.services";
import uploadService from "@/services/upload.services";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const SettingsOverview = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<User>();
  const [formData, setFormData] = useState<UserUpdateInput>({
    firstname: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUser?.id) {
      // Check if currentUser.id is defined
      uploadService.uploadFile(file).then((response) => {
        // Assuming the backend response contains the updated user data
        setUploadedImage(response.image);
        setCurrentUser(response); // Update the currentUser with the new data
      });
    } else {
      console.error("currentUser or currentUser.id is undefined");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await authServices.getCurrentUser();
      if (user) {
        setCurrentUser(user);

        setFormData({
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          email: user.email || "",
          confirmEmail: user.email || "",
          password: "",
          confirmPassword: "",
        });
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Validate the password first, even if it is not mandatory
      if (!isValidPassword()) return;

      if (!currentUser || !currentUser.id) {
        console.log(currentUser?.id);
        throw new Error("Current user ID not found");
      }

      if (formData.email !== formData.confirmEmail) {
        alert("Email addresses do not match. Please check and try again.");
        return;
      }
      // Exclude confirmPassword and confirmEmail from formData before submitting

      const { password, confirmPassword, confirmEmail, ...submitData } =
        formData;
      const cleanedSubmitData = password
        ? { password, ...submitData }
        : submitData;

      // Pass both the userId and the cleaned-up formData to updateUserdata
      console.log(submitData);
      await UserService.updateUserdata(currentUser.id, cleanedSubmitData);

      // Optionally, update the current user state or refetch the updated data
      setCurrentUser((prevUser) => {
        if (!prevUser) {
          // handle error or return prevUser
          return prevUser;
        }
        return { ...prevUser, ...submitData };
      });
      // Optionally, give feedback to the user about successful update
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // const isValidPassword = () => {
  //   const { password, confirmPassword } = formData;
  //   if (!password || password.length < 8) {
  //     alert("Password must be at least 8 characters long.");
  //     return false;
  //   }

  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match. Please check and try again.");
  //     return false;
  //   }

  //   return true;
  // };

  const isValidPassword = () => {
    const { password, confirmPassword } = formData;
    // Allow empty password
    if (!password && !confirmPassword) return true;

    if (password && password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please check and try again.");
      return false;
    }

    return true;
  };

  return (
    <div
      className={classNames(
        "bg-white",
        "h-[90%]",
        "w-[90%]",
        "rounded-xl",
        "mx-auto",
        "p-4"
      )}
    >
      <div
        className={classNames(
          "border",
          "mx-auto",
          "rounded-xl",
          "p-4",
          "h-full"
        )}
      >
        <h2 className={classNames("font-bold", "text-rose-950", "mb-5")}>
          My Profile
        </h2>
        <div
          className={classNames(
            "flex",
            "gap-4",
            "items-center",
            "mb-5",
            "flex-col",
            "md:flex-row"
          )}
        >
          {uploadedImage || currentUser?.image ? (
            <img
              src={
                uploadedImage
                  ? backendUrl + uploadedImage
                  : backendUrl + currentUser?.image
              }
              alt="Profile Picture"
              className={classNames(
                "w-[80px]",
                "h-[80px]",
                "rounded-full",
                "bg-neutral-100"
              )}
            />
          ) : (
            <div
              className={classNames(
                "w-[80px]",
                "h-[80px]",
                "rounded-full",
                "bg-neutral-100"
              )}
            ></div>
          )}

          <div className={classNames("flex", "gap-4")}>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleFileChange}
            />

            {/* Upload Button */}
            <Button
              onClick={handleUploadClick}
              className={classNames(
                "!bg-white",
                "!text-black",
                "border",
                "hover:!bg-black",
                "hover:!text-white"
              )}
            >
              Upload
            </Button>
            <Button
              className={classNames(
                "!bg-white",
                "!text-black",
                "border",
                "hover:!bg-black",
                "hover:!text-white"
              )}
              onClick={(e) => {
                if (currentUser) {
                  uploadService
                    .deleteFile(Number(currentUser?.id))
                    .then(() => {
                      window.location.reload();
                    })
                    .catch((error) => {
                      console.error("Error deleting the file:", error);
                    });
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
        <div
          className={classNames(
            "flex",
            "justify-center",
            "md:gap-10",
            "flex-col",
            "md:flex-row"
          )}
        >
          <label className={classNames("w-full")}>
            Firstname
            <Input
              name="firstname"
              className={classNames("my-2", "w-full")}
              placeholder="Firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </label>
          <label className={classNames("w-full")}>
            Lastname
            <Input
              name="lastname"
              className={classNames("my-2", "w-full")}
              placeholder="Lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </label>
        </div>
        <div
          className={classNames(
            "flex",
            "justify-center",
            "md:gap-10",
            "flex-col",
            "md:flex-row"
          )}
        >
          <label className={classNames("w-full")}>
            E-Mail
            <Input
              name="email"
              className={classNames("my-2", "w-full")}
              placeholder="E-Mail"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label className={classNames("w-full")}>
            E-Mail Confirmation
            <Input
              name="confirmEmail"
              className={classNames("my-2", "w-full")}
              placeholder="Confirm E-Mail"
              value={formData.confirmEmail}
              onChange={handleChange}
            />
          </label>
        </div>
        <div
          className={classNames(
            "flex",
            "justify-center",
            "md:gap-10",
            "mb-5",
            "flex-col",
            "md:flex-row"
          )}
        >
          <label className={classNames("w-full")}>
            Password
            <Input
              name="password"
              type="password" // Mask the password input
              className={classNames("my-2", "w-full")}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <label className={classNames("w-full")}>
            Password Confirmation
            <Input
              name="confirmPassword" // Change the name here
              type="password"
              className={classNames("my-2", "w-full")}
              placeholder="Confirm Password"
              value={formData.confirmPassword} // Bind the value here
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={classNames("flex", "justify-end")}>
          <Button
            onClick={handleSave}
            className={classNames(
              "!bg-white",
              "!text-black",
              "border",
              "hover:!bg-black",
              "hover:!text-white"
            )}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
