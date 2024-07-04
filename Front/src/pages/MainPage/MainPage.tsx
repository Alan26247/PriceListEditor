import HeaderUI from "widgets/HeaderUI";
import styles from './MainPage.module.css';
import ModalInfoUI from "features/Modals/ModalInfoUI";
import type { RootState } from 'app/store';
import { useSelector } from 'react-redux';
import SpinnerUI from "features/Spinner/SpinnerUI";
import { ServiceModes } from "shared/enums/ServiceModes";
import AddPriceListUI from "widgets/AddPriceListUI";
import PriceListArrayUI from "widgets//PriceListArrayUI";
import PriceListUI from "widgets/PriceListUI";
import AddPriceListItemUI from "widgets/AddPriceListItemUI";

const MainPage = () => {

  const info = useSelector((state: RootState) => state.info);
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div className={styles.page}>
      <HeaderUI />
      {mode.mode === ServiceModes.PriceListArrayUI && <PriceListArrayUI />}
      {mode.mode === ServiceModes.AddPriceListUI && <AddPriceListUI />}
      {mode.mode === ServiceModes.PriceListUI  && <PriceListUI />}
      {mode.mode === ServiceModes.AddPriceListItemUI && <AddPriceListItemUI />}
      <ModalInfoUI isOpen={info.isVisible} description={info.text} isSuccess={info.isSuccess} />
      <SpinnerUI />
    </div>
  );
}

export default MainPage;