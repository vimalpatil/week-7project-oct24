import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

const buildForm = (user) => ({
  name: user?.name || "",
  bio: user?.bio || "",
  location: user?.location || "",
  website: user?.website || "",
});

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => buildForm(user));

  useEffect(() => {
    setForm(buildForm(user));
  }, [user]);

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ ...user, ...form });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(buildForm(user));
    setEditing(false);
  };

  const renderValue = (value, placeholder) =>
    value ? (
      <p className="profile-field-value">{value}</p>
    ) : (
      <p className="profile-field-value empty">{placeholder}</p>
    );

  return (
    <Container className="profile-container py-3">
      <button
        type="button"
        className="profile-back-btn btn btn-link"
        onClick={() => navigate("/home")}
      >
        ← Back to Home
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">{initial}</div>
          </div>

          <div className="profile-info-section">
            <div className="profile-title-row">
              <h2 className="profile-name">{user?.name || "User"}</h2>
              <button
                type="button"
                className={`profile-btn ${editing ? "profile-btn-secondary" : "profile-btn-primary"}`}
                onClick={() => (editing ? handleCancel() : setEditing(true))}
              >
                {editing ? "✕ Close" : "✏ Edit Profile"}
              </button>
            </div>

            {editing ? (
              <Form onSubmit={handleSave}>
                <div className="profile-fields">
                  <div className="profile-field">
                    <label className="profile-field-label" htmlFor="profile-name">
                      Name
                    </label>
                    <input
                      id="profile-name"
                      type="text"
                      name="name"
                      className="form-control profile-form-control"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile-field">
                    <label className="profile-field-label" htmlFor="profile-email">
                      Email
                    </label>
                    <input
                      id="profile-email"
                      type="email"
                      className="form-control profile-form-control"
                      value={user?.email || ""}
                      disabled
                      readOnly
                    />
                  </div>
                  <div className="profile-field">
                    <label className="profile-field-label" htmlFor="profile-bio">
                      Bio
                    </label>
                    <textarea
                      id="profile-bio"
                      name="bio"
                      rows={3}
                      className="form-control profile-form-control"
                      value={form.bio}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile-field">
                    <label className="profile-field-label" htmlFor="profile-location">
                      Location
                    </label>
                    <input
                      id="profile-location"
                      type="text"
                      name="location"
                      className="form-control profile-form-control"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile-field">
                    <label className="profile-field-label" htmlFor="profile-website">
                      Website
                    </label>
                    <input
                      id="profile-website"
                      type="text"
                      name="website"
                      className="form-control profile-form-control"
                      value={form.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button type="submit" className="profile-btn profile-btn-success">
                    Save
                  </button>
                  <button
                    type="button"
                    className="profile-btn profile-btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            ) : (
              <div className="profile-fields">
                <div className="profile-field">
                  <div className="profile-field-label">Name</div>
                  {renderValue(user?.name, "Not set")}
                </div>
                <div className="profile-field">
                  <div className="profile-field-label">Email</div>
                  {renderValue(user?.email, "Not set")}
                </div>
                <div className="profile-field">
                  <div className="profile-field-label">Bio</div>
                  {renderValue(user?.bio, "No bio added yet")}
                </div>
                <div className="profile-field">
                  <div className="profile-field-label">Location</div>
                  {renderValue(user?.location, "No location added yet")}
                </div>
                <div className="profile-field">
                  <div className="profile-field-label">Website</div>
                  {renderValue(user?.website, "No website added yet")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
