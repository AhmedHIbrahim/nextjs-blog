import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  async function changePasswordHandler(passwordData: any) {
    try {
      // optional: Add validation

      const response = await fetch("/api/user/change-password", {
        method: "PATCH",
        body: JSON.stringify(passwordData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      console.log(result);
    } catch (error) {
      alert(error!.toString());
    }
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
