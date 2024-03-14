type PlexoLogoProps = {
  scale?: number;
  typographyColor?: string;
};

export default function PlexoLogo({ scale = 1, typographyColor }: PlexoLogoProps) {
  return (
    <svg
      width={155 * scale}
      height={182 * scale}
      viewBox="0 0 155 182"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M77.0638 78.0362C92.1178 78.0362 104.795 90.1106 105.794 105.808C105.864 106.911 106.753 107.809 107.858 107.809H121.769C122.874 107.809 123.773 106.911 123.728 105.808C122.703 80.5986 102.406 60.1248 77.0638 60.1248C76.8781 60.1248 76.6926 60.1259 76.5075 60.1281C44.8659 59.8314 18.9783 34.2096 17.9435 2.00393C17.908 0.899934 17.0159 0 15.9114 0H2C0.895429 0 -0.00258961 0.898415 0.0249289 2.00264C0.788659 32.6486 19.0311 59.0032 45.1277 71.0513C45.7917 71.3579 45.9328 72.2502 45.4008 72.752C36.5778 81.0749 30.9274 92.8125 30.3992 105.809C30.3544 106.912 31.2541 107.809 32.3586 107.809H46.27C47.3746 107.809 48.2633 106.911 48.3334 105.808C49.322 90.2826 61.7335 78.3012 76.57 78.0405C76.7342 78.0416 76.8986 78.0421 77.063 78.0421L77.0638 78.0362Z"
        fill="#19B888"
      />
      <path
        d="M141.078 43.4624C140.729 43.9881 139.986 44.0517 139.54 43.6062C135.799 39.8747 131.733 36.4751 127.388 33.455C126.942 33.1451 126.819 32.5383 127.105 32.0773C132.546 23.3274 135.828 13.0502 136.183 2.00012C136.218 0.896118 137.11 0 138.215 0H152.126C153.231 0 154.129 0.896268 154.101 2.0005C153.72 17.3121 148.978 31.5501 141.078 43.4624Z"
        fill="#19B888"
      />
      <path
        d="M77.0635 29.7728C62.0099 29.7724 49.3334 17.6982 48.3339 2.00072C48.2638 0.898387 47.3751 0 46.2705 0H32.3591C31.2546 0 30.3549 0.897831 30.3998 2.00149C31.4248 27.2102 51.722 47.6838 77.0635 47.6842C108.957 47.6842 135.142 73.417 136.183 105.811C136.219 106.915 137.111 107.815 138.215 107.815H152.127C153.231 107.815 154.129 106.917 154.102 105.812C153.338 75.1651 135.094 48.8096 108.996 36.7622C108.332 36.4556 108.191 35.5631 108.723 35.0613C117.548 26.7382 123.201 14.9988 123.729 2.00043C123.774 0.896774 122.874 0 121.769 0H107.858C106.754 0 105.865 0.898387 105.795 2.00072C104.795 17.6984 92.1175 29.7728 77.0635 29.7728Z"
        fill="#64E46E"
      />
      <path
        d="M13.0486 64.3525C13.3971 63.8269 14.1405 63.7632 14.587 64.2087C18.3274 67.9402 22.3933 71.3399 26.7386 74.36C27.1844 74.6699 27.3078 75.2766 27.0211 75.7377C21.5801 84.4876 18.2984 94.7648 17.9439 105.815C17.9085 106.919 17.0164 107.815 15.9119 107.815H2.00049C0.895919 107.815 -0.00212428 106.919 0.025355 105.814C0.406393 90.5028 5.14903 76.2649 13.0486 64.3525Z"
        fill="#64E46E"
      />
      <path
        d="M0.921081 182C0.412382 182 0 181.588 0 181.079V138.601C0 138.093 0.412382 137.68 0.921081 137.68H6.26813C6.70842 137.68 7.08714 137.992 7.17196 138.424L7.48086 139.997C7.63595 140.787 8.69576 141.038 9.26853 140.472C9.99672 139.753 10.8311 139.091 11.7716 138.485C13.4151 137.453 15.5311 136.938 18.1196 136.938C20.9957 136.938 23.5637 137.639 25.8235 139.042C28.0833 140.445 29.8706 142.364 31.1854 144.799C32.5002 147.233 33.1576 149.998 33.1576 153.093C33.1576 156.188 32.5002 158.953 31.1854 161.388C29.8706 163.781 28.0833 165.679 25.8235 167.082C23.5637 168.444 20.9957 169.125 18.1196 169.125C15.8187 169.125 13.8054 168.692 12.0797 167.825C11.276 167.422 10.5436 166.942 9.88252 166.386C9.18859 165.803 7.8888 166.255 7.8888 167.161V181.079C7.8888 181.588 7.47642 182 6.96772 182H0.921081ZM16.4555 162.192C18.9619 162.192 21.0368 161.346 22.6803 159.654C24.3238 157.963 25.1455 155.775 25.1455 153.093C25.1455 150.411 24.3238 148.203 22.6803 146.47C21.0368 144.737 18.9619 143.87 16.4555 143.87C13.9081 143.87 11.8127 144.737 10.1692 146.47C8.56674 148.162 7.76554 150.349 7.76554 153.031C7.76554 155.714 8.56674 157.921 10.1692 159.654C11.8127 161.346 13.9081 162.192 16.4555 162.192Z"
        fill={typographyColor ?? "#F2F2F2"}
      />
      <path
        d="M41.1258 168.382C40.6171 168.382 40.2048 167.97 40.2048 167.461V124.736C40.2048 124.227 40.6171 123.815 41.1258 123.815H47.1725C47.6812 123.815 48.0936 124.227 48.0936 124.736V167.461C48.0936 167.97 47.6812 168.382 47.1725 168.382H41.1258Z"
        fill={typographyColor ?? "#F2F2F2"}
      />
      <path
        d="M71.0074 169.125C67.9258 169.125 65.1935 168.465 62.8104 167.144C60.4273 165.824 58.5579 163.967 57.202 161.573C55.8461 159.18 55.1681 156.415 55.1681 153.279C55.1681 150.101 55.8255 147.275 57.1403 144.799C58.4962 142.323 60.3452 140.404 62.6872 139.042C65.0702 137.639 67.8642 136.938 71.069 136.938C74.0684 136.938 76.7185 137.598 79.0194 138.918C81.3203 140.239 83.1076 142.055 84.3814 144.365C85.6962 146.635 86.3536 149.173 86.3536 151.979C86.3536 152.433 86.333 152.907 86.2919 153.403C86.2919 153.63 86.2876 153.862 86.2789 154.098C86.2612 154.579 85.8585 154.95 85.3771 154.95H63.9818C63.4483 154.95 63.0219 155.403 63.1039 155.931C63.4042 157.862 64.1897 159.413 65.4606 160.583C66.9808 161.945 68.8092 162.626 70.9457 162.626C72.5482 162.626 73.8835 162.275 74.9518 161.573C75.8889 160.946 76.6207 160.171 77.1474 159.249C77.3255 158.938 77.6469 158.726 78.006 158.726H84.1952C84.811 158.726 85.2531 159.319 85.0282 159.893C84.4436 161.383 83.6116 162.768 82.5324 164.049C81.2176 165.617 79.5741 166.855 77.6019 167.763C75.6708 168.671 73.4726 169.125 71.0074 169.125ZM71.069 143.375C69.1379 143.375 67.4328 143.932 65.9536 145.046C64.7236 145.938 63.863 147.23 63.3717 148.921C63.2111 149.474 63.6494 149.998 64.225 149.998H77.3626C77.8933 149.998 78.3202 149.549 78.2293 149.026C77.9559 147.454 77.2537 146.168 76.1228 145.17C74.7669 143.973 73.0823 143.375 71.069 143.375Z"
        fill={typographyColor ?? "#F2F2F2"}
      />
      <path
        d="M89.7874 168.382C89.0359 168.382 88.6007 167.531 89.0408 166.922L98.6891 153.571C98.9218 153.249 98.9218 152.814 98.6891 152.492L89.0408 139.141C88.6007 138.532 89.0359 137.68 89.7874 137.68H95.9542C96.252 137.68 96.5314 137.824 96.7043 138.067L103.441 147.518C103.809 148.035 104.577 148.033 104.943 147.515L111.623 138.07C111.796 137.825 112.076 137.68 112.375 137.68H118.595C119.348 137.68 119.783 138.534 119.341 139.143L109.642 152.49C109.407 152.813 109.407 153.25 109.642 153.573L119.341 166.92C119.783 167.529 119.348 168.382 118.595 168.382H112.375C112.076 168.382 111.796 168.237 111.623 167.993L104.943 158.547C104.577 158.029 103.809 158.028 103.441 158.544L96.7043 167.996C96.5314 168.238 96.252 168.382 95.9542 168.382H89.7874Z"
        fill={typographyColor ?? "#F2F2F2"}
      />
      <path
        d="M138.472 169.125C135.514 169.125 132.843 168.444 130.46 167.082C128.118 165.721 126.249 163.843 124.852 161.45C123.496 159.015 122.818 156.209 122.818 153.031C122.818 149.854 123.517 147.068 124.914 144.675C126.31 142.24 128.18 140.342 130.522 138.98C132.905 137.618 135.576 136.938 138.534 136.938C141.451 136.938 144.081 137.618 146.423 138.98C148.806 140.342 150.675 142.24 152.031 144.675C153.428 147.068 154.127 149.854 154.127 153.031C154.127 156.209 153.428 159.015 152.031 161.45C150.675 163.843 148.806 165.721 146.423 167.082C144.04 168.444 141.39 169.125 138.472 169.125ZM138.472 162.254C140.527 162.254 142.314 161.491 143.834 159.964C145.355 158.396 146.115 156.085 146.115 153.031C146.115 149.978 145.355 147.687 143.834 146.16C142.314 144.592 140.547 143.808 138.534 143.808C136.439 143.808 134.631 144.592 133.11 146.16C131.631 147.687 130.892 149.978 130.892 153.031C130.892 156.085 131.631 158.396 133.11 159.964C134.631 161.491 136.418 162.254 138.472 162.254Z"
        fill={typographyColor ?? "#F2F2F2"}
      />
    </svg>
  );
}
