function ProfilePages() {
  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
        className="btn btn-error btn-block"
      >
        Sign Out
      </button>
    </div>
  );
}

export default ProfilePages;
