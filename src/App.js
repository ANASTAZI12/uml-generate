import React, { useState } from 'react';
import Diagram from './components/Diagram';
import './App.css';

function App() {
    const [classes, setClasses] = useState([]);
    const [className, setClassName] = useState('');
    const [attributes, setAttributes] = useState([{ name: '', type: '' }]);
    const [methods, setMethods] = useState([{ name: '', returnType: '' }]);
    const [relationSource, setRelationSource] = useState('');
    const [relationTarget, setRelationTarget] = useState('');
    const [relationType, setRelationType] = useState('');

    // Gestion de l'ajout de classe
    const handleAddClass = () => {
        const newClass = { name: className, attributes, methods, relations: [] };
        setClasses([...classes, newClass]);
        setClassName('');
        setAttributes([{ name: '', type: '' }]);
        setMethods([{ name: '', returnType: '' }]);
    };

    // Gestion de l'ajout d'attribut
    const handleAddAttribute = () => {
        setAttributes([...attributes, { name: '', type: '' }]);
    };

    // Mise à jour des attributs
    const handleAttributeChange = (index, field, value) => {
        const newAttributes = [...attributes];
        newAttributes[index][field] = value;
        setAttributes(newAttributes);
    };

    // Gestion de l'ajout de méthode
    const handleAddMethod = () => {
        setMethods([...methods, { name: '', returnType: '' }]);
    };

    // Mise à jour des méthodes
    const handleMethodChange = (index, field, value) => {
        const newMethods = [...methods];
        newMethods[index][field] = value;
        setMethods(newMethods);
    };

    // Gestion de l'ajout de relation
    const handleAddRelation = () => {
        const sourceClass = classes.find(cls => cls.name === relationSource);
        const targetClass = classes.find(cls => cls.name === relationTarget);

        if (sourceClass && targetClass) {
            sourceClass.relations.push({ target: targetClass.name, type: relationType });
            setClasses([...classes]);
        }

        setRelationSource('');
        setRelationTarget('');
        setRelationType('');
    };

    return (
        <div className="App">
            <div className="input-section">
                <h2>Ajouter une Classe</h2>
                <input
                    type="text"
                    placeholder="Nom de la classe"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />
                <button onClick={handleAddClass}>Ajouter Classe</button>

                <h3>Ajouter des Attributs</h3>
                {attributes.map((attr, index) => (
                    <div key={index} className="attribute-input">
                        <input
                            type="text"
                            placeholder="Nom de l'attribut"
                            value={attr.name}
                            onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                        />
                        <select
                            value={attr.type}
                            onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
                        >
                            <option value="">Sélectionner le type</option>
                            <option value="String">String</option>
                            <option value="int">int</option>
                            <option value="boolean">boolean</option>
                            <option value="double">double</option>
                            <option value="Date">Date</option>
                        </select>
                    </div>
                ))}
                <button onClick={handleAddAttribute}>Ajouter un attribut</button>

                <h3>Ajouter des Méthodes</h3>
                {methods.map((method, index) => (
                    <div key={index} className="method-input">
                        <input
                            type="text"
                            placeholder="Nom de la méthode"
                            value={method.name}
                            onChange={(e) => handleMethodChange(index, 'name', e.target.value)}
                        />
                        <select
                            value={method.returnType}
                            onChange={(e) => handleMethodChange(index, 'returnType', e.target.value)}
                        >
                            <option value="">Sélectionner le type de retour</option>
                            <option value="void">void</option>
                            <option value="String">String</option>
                            <option value="int">int</option>
                            <option value="boolean">boolean</option>
                            <option value="double">double</option>
                            <option value="Date">Date</option>
                        </select>
                    </div>
                ))}
                <button onClick={handleAddMethod}>Ajouter une méthode</button>

                <h3>Ajouter une Relation</h3>
                <div>
                    <select
                        value={relationSource}
                        onChange={(e) => setRelationSource(e.target.value)}
                    >
                        <option value="">Sélectionner la classe source</option>
                        {classes.map((cls, index) => (
                            <option key={index} value={cls.name}>{cls.name}</option>
                        ))}
                    </select>
                    <select
                        value={relationTarget}
                        onChange={(e) => setRelationTarget(e.target.value)}
                    >
                        <option value="">Sélectionner la classe cible</option>
                        {classes.map((cls, index) => (
                            <option key={index} value={cls.name}>{cls.name}</option>
                        ))}
                    </select>
                    <select
                        value={relationType}
                        onChange={(e) => setRelationType(e.target.value)}
                    >
                        <option value="">Sélectionner le type de relation</option>
                        <option value="association">Association</option>
                        <option value="inheritance">Héritage</option>
                        <option value="dependency">Dépendance</option>
                    </select>
                    <button onClick={handleAddRelation}>Ajouter la relation</button>
                </div>
            </div>

            <button onClick={handleAddClass}>Valider la classe</button>

            {/* Affichage des diagrammes */}
            <Diagram classes={classes} />
        </div>
    );
}

export default App;
