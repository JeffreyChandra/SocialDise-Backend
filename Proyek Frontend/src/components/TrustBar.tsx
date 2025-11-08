interface TrustBar {
  text: number;
  hBar: string;
  wBar: string;
  textSize: string;
}
const TrustBar = ({ text, hBar, wBar, textSize }: TrustBar) => {
  return (
    <div className="flex gap-[11px] items-center">
      <div
        style={{ height: hBar, width: wBar }}
        className="rounded-[3px] overflow-hidden bg-white"
      >
        <div
          style={{ width: `${text}%` }}
          className={`h-full bg-success-verified border-[0.5px] border-[#616161]`}
        ></div>
      </div>
      <div style={{ fontSize: textSize }}>{text}%</div>
    </div>
  );
};

export default TrustBar;
