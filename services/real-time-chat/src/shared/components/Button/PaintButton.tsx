import { JSX } from "react";
import styles from "./PaintButton.module.scss";

type ToolbarButtonProps = {
  content: string;
  icon?: JSX.Element;
  onClick: () => void;
};

function PaintButton(props: ToolbarButtonProps) {
  const { onClick, content, icon } = props;
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {content} {icon}
    </button>
  );
}

PaintButton.defaultProps = {
  icon: <div />,
};

export { PaintButton };
