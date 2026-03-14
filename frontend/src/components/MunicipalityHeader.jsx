import { useAuth } from "../context/AuthContext";
import { MUNICIPALITY } from "../config/municipalityConfig";

const MunicipalityHeader = ({ showLogo = false }) => {
  const { user } = useAuth();

  return (
    <div className="text-center mb-4">
      {showLogo && (
        <img src={MUNICIPALITY.logoSrc} className="w-16 mx-auto mb-2" />
      )}

      <h1>{MUNICIPALITY.name}</h1>

      {user?.role === "SUPERADMIN" ? (
        <h2>सबै वडा कार्यालय</h2>
      ) : (
        <h2>वडा नं. {user?.ward} वडा कार्यालय</h2>
      )}

      <p>{MUNICIPALITY.officeLine}</p>
      <p>{MUNICIPALITY.provinceLine}</p>
    </div>
  );
};

export default MunicipalityHeader;
