import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addBar, updateBar, fetchBar } from '../apiClient.js';

const BarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bar, setBar] = useState({
    name: "",
    address: "",
    tel: "",
    email: "",
    description: ""
  });

  useEffect(() => {
    if (id) {
      const loadBar = async () => {
        const fetchedBar = await fetchBar(id);
        setBar({
          name: fetchedBar.name,
          address: fetchedBar.address,
          tel: fetchedBar.tel,
          email: fetchedBar.email,
          description: fetchedBar.description,
        });
      };
      loadBar();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBar(prevBar => ({
      ...prevBar,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateBar(id, bar);
    } else {
      await addBar(bar);
    }
    navigate('/bars');
  };

  const handleBack = () => {
    navigate('/bars'); // renvoie sur la page précèdente initialement mais précision sur la page liste
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nom du bar</label>
        <input
          name="name"
          className="form-control"
          value={bar.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          name="address"
          className="form-control"
          value={bar.address}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tél</label>
        <input
          name="tel"
          className="form-control"
          value={bar.tel}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={bar.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description :</label>
        <input
          name="description"
          className="form-control"
          value={bar.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Enregistrement</button>
      <button type="button" className="btn btn-secondary" onClick={handleBack}>Retour</button>
    </form>
  );
};

export default BarForm;
