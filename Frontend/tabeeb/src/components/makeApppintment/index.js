const MakeAppointmentComponent = (props) => {
  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Patient Email</span>
        </label>
        <input
          type="email"
          placeholder="patient email"
          className="input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Doctor Email</span>
        </label>
        <input
          type="email"
          placeholder="doctor email"
          className="input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Appointment Date</span>
        </label>
        <input
          type="date"
          placeholder="date"
          className="input input-bordered"
        />
      </div>

      <div className="form-control mt-6">
        <button className="btn btn-primary">
          Submit Details
        </button>
      </div>
    </div>
  );
};

export default MakeAppointmentComponent;
