const Footer = () => {
  return (
    // <div className="text-center mt-auto bg-purple-700 text-white py-4 z-50 my-0">

    //   All Credits Reserves &copy; {new Date().getFullYear()} | Suronjit Pal
    // </div>

    <div className="py-3 flex justify-center items-center bg-secondary  px-3 custom_shadow h-16">
      All Rights Reserves by Suronjit Pal || &copy;  {new Date().getFullYear()}
    </div>
  );
};

export default Footer;
