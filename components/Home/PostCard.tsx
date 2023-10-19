export const PostCard = ({ children }: any) => {
  return (
    <div
      className="bg-transparent border rounded-md text-base h-fit text-center p-4
      user-select-none w-[300px] hover:border-transparent
      bg-theme-navbar-hover-light dark:bg-theme-navbar-hover-dark"
    >
      {children}
    </div>
  );
};

export default PostCard;
