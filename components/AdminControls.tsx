import {
  ArrowPathIcon,
  ArrowUturnDownIcon,
  CurrencyDollarIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import React from "react";

interface ButtonProps {
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  onClick: () => void;
}
const Button = ({ Icon, title, onClick }: ButtonProps) => (
  <button
    className="bg-[#091f1c] p-2 flex-1 rounded-md border-2 border-[#004337] hover:bg-emerald-500/50"
    onClick={onClick}
  >
    <Icon className="h-6 mx-auto mb-2" />
    {title}
  </button>
);

interface Props {
  operatorTotalCommission: string;
  drawWinner: () => void;
  onWithdrawCommission: () => void;
  onRestartDraw: () => void;
  onRefundAll: () => void;
}

const AdminControls = ({
  operatorTotalCommission,
  drawWinner,
  onWithdrawCommission,
  onRestartDraw,
  onRefundAll,
}: Props) => (
  <div className="text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border">
    <h2 className="font-bold">Admin Controls</h2>
    <p className="mb-5 ">
      Total Commission to be withdrawn: {operatorTotalCommission}
    </p>
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
      <Button Icon={StarIcon} onClick={drawWinner} title="Draw Winner" />
      <Button
        Icon={CurrencyDollarIcon}
        onClick={onWithdrawCommission}
        title="Withdraw commission"
      />
      <Button
        Icon={ArrowPathIcon}
        onClick={onRestartDraw}
        title="Restart Draw"
      />
      <Button
        Icon={ArrowUturnDownIcon}
        onClick={onRefundAll}
        title="Refund All"
      />
    </div>
  </div>
);

export default AdminControls;
