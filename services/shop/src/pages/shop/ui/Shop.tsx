import { Outlet } from "react-router-dom";

type ShopPageProps = {
  // props here
};

const ShopPage = (props: ShopPageProps) => {
  return (
    <div>
      <h1>Shop page</h1>
      <Outlet />
    </div>
  );
};

export default ShopPage;
