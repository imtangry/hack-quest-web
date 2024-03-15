import React, { useState } from 'react';

import { titleTxtData } from '../../../constants/data';
import Info from './Info';
import StakeFuel from './StakeFuel';
import InvitationFuel from './InvitationFuel';
import TargetFuel from './TargetFuel';
import UnstakeModal from './UnstakeModal';

interface YourFuelingBoardProp {}

const YourFuelingBoard: React.FC<YourFuelingBoardProp> = () => {
  const [modalName, setModalName] = useState('');
  const hanleStake = () => {};
  return (
    <div className="mt-[120px]">
      <p className="text-h3 text-neutral-off-black">{titleTxtData[2]}</p>
      <p className="body-l my-[24px] text-neutral-black">
        Congratulations! It’s time to claim your token!
      </p>
      <Info />
      <StakeFuel />
      <InvitationFuel />
      <TargetFuel />
      {/* <StakeModal
        open={modalName === 'stake'}
        onClose={() => setModalName('')}
        loading={false}
        hanleStake={hanleStake}
      /> */}
      <UnstakeModal />
    </div>
  );
};

export default YourFuelingBoard;
