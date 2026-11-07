import { listAccount } from "../../data";

const CleanCapital = () => {

    let sum = 0

    const sumFanction = (a: number, b: number) => a + b

    listAccount.forEach(i => {
        sum = sumFanction(sum, i.money)
    });
    return (
        <div className="clean-capital">
            <h1>Чистый капитал</h1>
            <p>{sum}</p>
        </div>
    );
}
 
export default CleanCapital;