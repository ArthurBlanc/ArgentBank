import PropTypes from "prop-types";

/**
 * Render a transaction card (account) containing title, amount and description of the card.
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
function AccountCard({ title, amount, description }) {
	return (
		<section className="account">
			<div className="account-content-wrapper">
				<h3 className="account-title">{title}</h3>
				<p className="account-amount">${amount.toLocaleString("en-US")}</p>
				<p className="account-amount-description">{description}</p>
			</div>
			<div className="account-content-wrapper cta">
				<button className="transaction-button">View transactions</button>
			</div>
		</section>
	);
}

AccountCard.propTypes = {
	/**
	 * Title string (required) to be displayed in the card
	 */
	title: PropTypes.string.isRequired,
	/**
	 * Number of the amount (required) to be displayed in the card
	 */
	amount: PropTypes.number.isRequired,
	/**
	 * Description string (required) to be displayed in the card
	 */
	description: PropTypes.string.isRequired,
};

export default AccountCard;
