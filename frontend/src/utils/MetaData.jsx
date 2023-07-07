import { Helmet } from "react-helmet-async";

const MetaData = ({title}) => {
    return (
        <Helmet>
            <title>{`${title} - SAT`}</title>
        </Helmet>
    )
}

export default MetaData;