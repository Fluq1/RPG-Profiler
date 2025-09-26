import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';

const SubclassSelector = ({ selectedClass, onSelect, selectedSubclass, systemData }) => {
  if (!selectedClass || !selectedClass.subclasses) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="title-fantasy mb-6 text-center">
        Escolha uma Especialização para {selectedClass.name}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedClass.subclasses.map((subclass) => (
          <motion.div
            key={subclass.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              onClick={() => onSelect(subclass)}
              selected={selectedSubclass?.id === subclass.id}
              className="flex flex-col p-6 h-full cursor-pointer"
            >
              <h4 className="font-fantasy text-lg mb-3 text-rpg-gold">
                {subclass.name}
              </h4>
              <p className="text-rpg-light/80 mb-4 flex-grow">
                {subclass.description}
              </p>
              
              {subclass.features && subclass.features.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-semibold text-rpg-accent mb-2">Características:</h5>
                  <ul className="text-sm text-rpg-light/70 space-y-1">
                    {subclass.features.slice(0, 2).map((feature, index) => (
                      <li key={index}>
                        <strong>{feature.name}</strong> (Nível {feature.level}): {feature.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubclassSelector;