import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Input from "../Forms/InputForms/InputText";
import Button from "../Buttons/button";
import { getCurrentUser } from "@/services/auth.services";
import type { User, UserUpdateInput } from "@/types/user";
import UserService from "@/services/user.services";
import uploadService from "@/services/upload.services";
import { backendUrl } from "@/services/api.services";
//export default

interface UploadResponse {
  image: string;
}

const SettingsOverview: FC = () => {
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
      void uploadService.uploadFile(file).then((response: UploadResponse) => {
        setUploadedImage(response.image);
        setCurrentUser(response as unknown as User);
      });
    } else {
      console.error("currentUser or currentUser.id is undefined");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
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

    void fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    try {
      if (!isValidPassword()) return;

      if (!currentUser || !currentUser.id) {
        throw new Error("Current user ID not found");
      }

      if (formData.email !== formData.confirmEmail) {
        alert("Email addresses do not match. Please check and try again.");
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, confirmPassword, confirmEmail, ...submitData } =
        formData;
      const cleanedSubmitData = password
        ? { password, ...submitData }
        : submitData;

      UserService.updateUserdata(currentUser.id, cleanedSubmitData);

      setCurrentUser((prevUser) => {
        if (!prevUser) {
          return prevUser;
        }
        return { ...prevUser, ...submitData };
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const isValidPassword = () => {
    const { password, confirmPassword } = formData;
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
            <Image
              src={backendUrl + (uploadedImage || currentUser?.image || "")}
              alt="Profile Picture"
              width={80}
              height={80}
              className={classNames(
                "w-20",
                "h-20",
                "rounded-full",
                "bg-neutral-100"
              )}
            />
          ) : (
            <div
              className={classNames(
                "w-20",
                "h-20",
                "rounded-full",
                "bg-neutral-100"
              )}
            />
          )}

          <div className={classNames("flex", "gap-4")}>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleFileChange}
            />
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
              onClick={() => {
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
              type="password"
              className={classNames("my-2", "w-full")}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <label className={classNames("w-full")}>
            Password Confirmation
            <Input
              name="confirmPassword"
              type="password"
              className={classNames("my-2", "w-full")}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
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

export default SettingsOverview;
