import styles from "/styles/common/Footer.module.scss";
import Link from "next/link";
import { forwardRef, LegacyRef, Ref } from "react";
import Image from "next/image";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

const FooterBar = ({ children }: any) => {
  return <div className={styles.footer_bar}>{children}</div>;
};

const FooterBarList = ({ children }: any) => {
  return <div className={styles.footer_bar_list}>{children}</div>;
};

const FooterBarLeft = ({ children }: any) => {
  return <div className={styles.footer_bar_left}>{children}</div>;
};

const FooterBarCenter = ({ children }: any) => {
  return <div className={styles.footer_bar_center}>{children}</div>;
};

const FooterBarRight = ({ children }: any) => {
  return <div className={styles.footer_bar_right}>{children}</div>;
};

const myFooterButton = (
  { children, ...props }: any,
  ref: LegacyRef<HTMLButtonElement> | undefined
) => (
  <button className={styles.footer_button} {...props} ref={ref}>
    {children}
  </button>
);
const FooterButton = forwardRef(myFooterButton);

const myStyledImageButton = (
  { src, ...props }: any,
  ref: LegacyRef<HTMLImageElement> | undefined
) => <Image ref={ref} src={src} {...props}></Image>;
const StyledImageButton = forwardRef(myStyledImageButton);

const myFooterImageButton = (
  { theme, src, ...props }: any,
  ref: Ref<HTMLImageElement> | undefined
) => (
  <button className={styles.footer_button}>
    <StyledImageButton
      ref={ref}
      theme={theme}
      src={src}
      className={styles.image_button_img}
      {...props}
    />
  </button>
);
const FooterImageButton = forwardRef(myFooterImageButton);

const FooterItem = ({ children }: any) => {
  return <div className={styles.footer_item}>{children}</div>;
};

export const Footer = ({ theme }: any) => {
  return (
    <FooterBar>
      <FooterBarList theme={theme}>
        <FooterBarLeft>
          <div>Jorge Menjivar © 2022</div>
        </FooterBarLeft>
        <FooterBarCenter>
          <FooterItem>
            <a
              className={styles.footer_button}
              href="https://twitter.com/jorgemenjivarr"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterLogoIcon width="16px" height="16px" />
            </a>
          </FooterItem>
        </FooterBarCenter>
        <FooterBarRight></FooterBarRight>
      </FooterBarList>
    </FooterBar>
  );
};
