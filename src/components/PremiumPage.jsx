import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PremiumPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🎭',
      title: 'Personagens Ilimitados',
      description: 'Crie quantos personagens quiser, sem limite de 3 personagens'
    },
    {
      icon: '📚',
      title: 'Sistemas Exclusivos',
      description: 'Acesso antecipado a novos sistemas de RPG'
    },
    {
      icon: '🎨',
      title: 'Customização Avançada',
      description: 'Opções extras de personalização e detalhamento'
    },
    {
      icon: '💾',
      title: 'Backup na Nuvem',
      description: 'Seus personagens salvos com segurança na nuvem'
    },
    {
      icon: '🚀',
      title: 'Recursos Exclusivos',
      description: 'Acesso a ferramentas e recursos premium'
    },
    {
      icon: '🎯',
      title: 'Suporte Prioritário',
      description: 'Atendimento prioritário e suporte técnico'
    }
  ];

  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      features: [
        'Até 3 personagens',
        'Sistema D&D 5e',
        'Criação básica',
        'Suporte da comunidade'
      ],
      current: true
    },
    {
      name: 'Premium',
      price: 'R$ 19,90',
      period: '/mês',
      features: [
        'Personagens ilimitados',
        'Todos os sistemas de RPG',
        'Customização avançada',
        'Backup na nuvem',
        'Recursos exclusivos',
        'Suporte prioritário'
      ],
      popular: true
    },
    {
      name: 'Premium Anual',
      price: 'R$ 199,90',
      period: '/ano',
      originalPrice: 'R$ 238,80',
      features: [
        'Todos os recursos Premium',
        '2 meses grátis',
        'Desconto de 16%',
        'Acesso antecipado a novidades'
      ],
      bestValue: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">⭐</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Forged Premium
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Desbloqueie todo o potencial da criação de personagens com recursos exclusivos e acesso ilimitado
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-semibold text-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Começar Teste Grátis de 7 Dias
            </button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Recursos Premium</h2>
          <p className="text-gray-400 text-lg">Tudo que você precisa para criar personagens incríveis</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] rounded-xl p-6 border border-[rgba(255,255,255,0.1)] hover:border-yellow-500/30 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Escolha Seu Plano</h2>
          <p className="text-gray-400 text-lg">Comece grátis e faça upgrade quando precisar</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`relative rounded-xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? 'border-yellow-500 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 scale-105'
                  : plan.bestValue
                  ? 'border-orange-500 bg-gradient-to-br from-orange-500/10 to-red-500/10'
                  : 'border-[rgba(255,255,255,0.1)] bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}
              {plan.bestValue && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Melhor Valor
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  {plan.originalPrice && (
                    <span className="text-gray-500 line-through mr-2">{plan.originalPrice}</span>
                  )}
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.current
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Plano Atual' : 'Escolher Plano'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
        </motion.div>

        <div className="space-y-6">
          {[
            {
              question: 'Posso cancelar a qualquer momento?',
              answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.'
            },
            {
              question: 'O que acontece com meus personagens se eu cancelar?',
              answer: 'Seus personagens ficam salvos, mas você volta ao limite de 3 personagens do plano gratuito.'
            },
            {
              question: 'Existe desconto para estudantes?',
              answer: 'Sim! Oferecemos 50% de desconto para estudantes com comprovação acadêmica válida.'
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-[#1A1A1A] rounded-xl p-6 border border-[rgba(255,255,255,0.1)]"
            >
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-t border-[rgba(255,255,255,0.1)]">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-gray-400 text-lg mb-8">
              Junte-se a milhares de jogadores que já estão criando personagens incríveis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-semibold text-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Começar Teste Grátis
              </button>
              <button 
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Voltar ao Início
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;