
const PopUpNotification = ({ isHidden, error } : { isHidden: boolean, error: boolean }) => {
  return (
    <div className="fixed w-full h-full top-0 left-0" hidden={isHidden}>
      <p className="my-96 text-4xl font-semibold text-center">
        {error ? "Add to cart has failed, please try again" : "Successfully add to cart"}
      </p>
    </div>
  );
};

export default PopUpNotification;
