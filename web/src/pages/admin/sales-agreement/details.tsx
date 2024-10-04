import { useParams } from "react-router-dom"

export default function SalesAgreementDetails() {
  const {id} = useParams();
  return (
    <div>SalesAgreementDetails {id}</div>
  )
}
