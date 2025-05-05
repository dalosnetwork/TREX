import PropTypes from "prop-types";

export default function Icon({ name, ...props }) {
  switch (name) {
    case "gas":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20.6816 6.9751L19.8541 6.14728C19.8538 6.14703 19.8543 6.14752 19.8541 6.14728L16.8789 3.17139C16.6836 2.97607 16.3672 2.97607 16.1719 3.17139C15.9766 3.3667 15.9766 3.68311 16.1719 3.87842L17.9191 5.62592L16.9844 8.11816C16.6406 9.0332 16.8652 10.0718 17.5566 10.7642L21 14.207V19C21 20.1025 20.1025 21 19 21C17.8975 21 17 20.1025 17 19V16.5C17 15.1211 15.8789 14 14.5 14H14V4.5C14 3.12158 12.8789 2 11.5 2H4.5C3.12158 2 2 3.12158 2 4.5V19.5C2 20.8789 3.12158 22 4.5 22H11.5C12.8789 22 14 20.8789 14 19.5V15H14.5C15.3271 15 16 15.6729 16 16.5V19C16 20.6543 17.3457 22 19 22C20.6543 22 22 20.6543 22 19V10.1567C22 8.97266 21.5195 7.81299 20.6816 6.9751ZM13 19.5C13 20.3271 12.3271 21 11.5 21H4.5C3.67285 21 3 20.3271 3 19.5V11H13V19.5ZM13 10H3V4.5C3 3.67285 3.67285 3 4.5 3H11.5C12.3271 3 13 3.67285 13 4.5V10ZM21 12.793L18.2637 10.0576C17.8496 9.64209 17.7148 9.01855 17.9199 8.46973L18.6953 6.40283L19.9746 7.68213C20.626 8.33398 21 9.23584 21 10.1567V12.793Z"
            fill="#FCFCFC"
          />
        </svg>
      );
    case "swap":
      return (
        <svg
        className={props.className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8.72705 4V20L2.72705 14.5"
            stroke="white"
            stroke-width="3"
            stroke-linecap="square"
            stroke-linejoin="round"
          />
          <path
            d="M14.7271 20L14.7271 4L20.7271 9.5"
            stroke="white"
            stroke-width="3"
            stroke-linecap="square"
            stroke-linejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};
