import FooterNav from "../../components/ui/FooterNav";

function ProfilePages() {
  return (
    <div className="z-20 flex flex-col items-center justify-center w-screen h-screen p-4">
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
        className="btn btn-error btn-block"
      >
        Sign Out
      </button>

      <FooterNav />
    </div>
  );
}

export default ProfilePages;
