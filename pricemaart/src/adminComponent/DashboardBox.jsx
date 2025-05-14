import PropTypes from "prop-types";

const DashboardBox = ({color,length,icon,title}) => {

  return (
    <div
      className="min-w-[240px] xs:min-w-[200px] xs:p-5  p-5 rounded-xl  h-[130px] bg-gray-500"
      style={{
        backgroundImage: `linear-gradient(to right, ${color?.[0]} , ${color?.[1]})`,
      }}
    >
      <div className="text-white  ">
        <div className="flex justify-between xs:gap-2 items-center">
          <div className=" flex flex-col ">
            <h4 className="text-lg xs:text-[14px] font-semibold">{title}</h4>
            <span className="text-4xl  font-bold">{length}</span>
          </div>
          <div
            className="w-[60px] xs:w-[40px] xs:h-[40px] flex h-[60px]   justify-center items-center bg-gray-600 opacity-25 rounded-xl"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right   ,gray, black,black, black)",
            }}
          >
            {icon ? (
              <span className="">{icon ? icon : ""}</span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    
    </div>
  );
};
DashboardBox.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
 
};
DashboardBox.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default DashboardBox;
