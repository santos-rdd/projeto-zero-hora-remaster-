import "./itemRow.css";

export default function ItemRow (props){

    const i1 = props.i1 || "?";
    const i2 = props.i2 || "???";
    const i3 = props.i3 || "???";
    const i4 = props.i4 || "?";
    const i5 = props.i5 || "???";

    return (
        <div className="row">
            <p>{ i1 }</p>
            <p className="align">{ i2 }</p>
            <p>{ i3 }</p>
            <p>{ i4 }</p>
            <p>{ i5 }</p>
        </div>
    )
}