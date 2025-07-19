import os
import json
from typing import List, Dict, Any
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI
from langchain.schema import Document
from datetime import datetime

class PortfolioRAGChatbot:
    def __init__(self):
        self.embeddings = None
        self.vectorstore = None
        self.qa_chain = None
        self.portfolio_data = self._load_portfolio_data()
        self._initialize_rag_system()
    
    def _load_portfolio_data(self) -> List[Dict[str, Any]]:
        """Load portfolio content for RAG context"""
        portfolio_content = [
            {
                "type": "personal_info",
                "content": """
                K Sree Charan is a passionate Full Stack Developer with expertise in modern web technologies.
                He specializes in React, Node.js, Python, and various databases. He has a problem-solving mindset,
                is a fast learner, great team collaborator, and creative innovator.
                """
            },
            {
                "type": "skills",
                "content": """
                Technical Skills:
                - Frontend: React.js, JavaScript, HTML5, CSS3, TypeScript, Redux, Vue.js
                - Backend: Node.js, Python, Express.js, Flask, Django, RESTful APIs
                - Databases: MongoDB, PostgreSQL, MySQL, Firebase
                - Cloud & DevOps: AWS, Docker, Git, CI/CD
                - Mobile: React Native, Flutter
                - Other: Machine Learning, Data Analysis, Agile Methodologies
                """
            },
            {
                "type": "experience",
                "content": """
                Professional Experience:
                - Full Stack Developer with experience in building scalable web applications
                - Worked on various projects involving e-commerce, data analytics, and enterprise solutions
                - Experience with microservices architecture and cloud deployment
                - Led development teams and mentored junior developers
                """
            },
            {
                "type": "projects",
                "content": """
                Notable Projects:
                1. E-commerce Platform - Built using React, Node.js, and MongoDB
                2. Data Analytics Dashboard - Python, Flask, and PostgreSQL
                3. Mobile App Development - React Native with Firebase backend
                4. AI/ML Projects - Machine learning models for data prediction
                5. Portfolio Website - Modern React portfolio with advanced animations
                """
            },
            {
                "type": "education",
                "content": """
                Education & Certifications:
                - Computer Science background with focus on software engineering
                - Continuous learning through online platforms and certifications
                - AWS certifications, React specializations
                - Active participation in developer communities
                """
            },
            {
                "type": "contact",
                "content": """
                Contact Information:
                - Available for freelance projects and full-time opportunities
                - Open to collaboration on interesting projects
                - Contact through the portfolio website's contact form
                - Active on professional networks and GitHub
                """
            }
        ]
        return portfolio_content
    
    def _initialize_rag_system(self):
        """Initialize the RAG system with embeddings and vector store"""
        try:
            # For demo purposes, we'll use a simple embedding approach
            # In production, you'd use OpenAI embeddings with proper API key
            self.embeddings = self._create_simple_embeddings()
            
            # Create documents from portfolio data
            documents = []
            for item in self.portfolio_data:
                doc = Document(
                    page_content=item["content"],
                    metadata={"type": item["type"], "timestamp": datetime.now().isoformat()}
                )
                documents.append(doc)
            
            # Split documents into chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=500,
                chunk_overlap=50,
                length_function=len
            )
            split_docs = text_splitter.split_documents(documents)
            
            # Create vector store (using simple in-memory store for demo)
            self.vectorstore = self._create_simple_vectorstore(split_docs)
            
            # Initialize QA chain
            self._initialize_qa_chain()
            
        except Exception as e:
            print(f"Error initializing RAG system: {e}")
            self.vectorstore = None
    
    def _create_simple_embeddings(self):
        """Create a simple embedding system for demo purposes"""
        class SimpleEmbeddings:
            def embed_documents(self, texts):
                # Simple word count based embeddings for demo
                return [[len(text.split()), text.count(' '), len(text)] for text in texts]
            
            def embed_query(self, text):
                return [len(text.split()), text.count(' '), len(text)]
        
        return SimpleEmbeddings()
    
    def _create_simple_vectorstore(self, documents):
        """Create a simple vector store for demo purposes"""
        class SimpleVectorStore:
            def __init__(self, docs):
                self.docs = docs
                self.embeddings = []
            
            def similarity_search(self, query, k=3):
                # Simple keyword matching for demo
                query_lower = query.lower()
                scored_docs = []
                
                for doc in self.docs:
                    content_lower = doc.page_content.lower()
                    score = 0
                    
                    # Simple scoring based on keyword matches
                    query_words = query_lower.split()
                    for word in query_words:
                        score += content_lower.count(word)
                    
                    if score > 0:
                        scored_docs.append((score, doc))
                
                # Sort by score and return top k
                scored_docs.sort(key=lambda x: x[0], reverse=True)
                return [doc for score, doc in scored_docs[:k]]
        
        return SimpleVectorStore(documents)
    
    def _initialize_qa_chain(self):
        """Initialize the QA chain"""
        # For demo purposes, we'll create a simple QA system
        self.qa_chain = self
    
    def get_response(self, query: str) -> Dict[str, Any]:
        """Get response from the RAG chatbot"""
        try:
            if not self.vectorstore:
                return {
                    "response": "I'm sorry, but the knowledge base is not available right now. Please try again later.",
                    "sources": [],
                    "confidence": 0.0
                }
            
            # Retrieve relevant documents
            relevant_docs = self.vectorstore.similarity_search(query, k=3)
            
            if not relevant_docs:
                return {
                    "response": "I don't have specific information about that topic in my knowledge base. Could you ask something about K Sree Charan's skills, experience, projects, or contact information?",
                    "sources": [],
                    "confidence": 0.2
                }
            
            # Generate response based on retrieved documents
            context = "\n".join([doc.page_content for doc in relevant_docs])
            response = self._generate_response(query, context)
            
            # Extract source types
            sources = [doc.metadata.get("type", "unknown") for doc in relevant_docs]
            
            return {
                "response": response,
                "sources": sources,
                "confidence": 0.8 if len(relevant_docs) >= 2 else 0.6
            }
            
        except Exception as e:
            return {
                "response": f"I encountered an error while processing your question: {str(e)}",
                "sources": [],
                "confidence": 0.0
            }
    
    def _generate_response(self, query: str, context: str) -> str:
        """Generate response based on query and context"""
        query_lower = query.lower()
        
        # Simple rule-based response generation for demo
        if any(word in query_lower for word in ['skill', 'technology', 'programming', 'language']):
            return f"Based on the information I have, K Sree Charan has expertise in various technologies including React.js, Node.js, Python, JavaScript, and many other modern web technologies. He specializes in full-stack development with experience in both frontend and backend technologies, databases, and cloud services."
        
        elif any(word in query_lower for word in ['experience', 'work', 'job', 'professional']):
            return f"K Sree Charan is an experienced Full Stack Developer who has worked on various projects including e-commerce platforms, data analytics dashboards, and mobile applications. He has experience with microservices architecture, cloud deployment, and has led development teams while mentoring junior developers."
        
        elif any(word in query_lower for word in ['project', 'portfolio', 'built', 'created']):
            return f"K Sree Charan has worked on several notable projects including an e-commerce platform built with React and Node.js, data analytics dashboards using Python and Flask, mobile apps with React Native, AI/ML projects, and modern portfolio websites with advanced animations."
        
        elif any(word in query_lower for word in ['education', 'learning', 'certification', 'study']):
            return f"K Sree Charan has a Computer Science background with a focus on software engineering. He believes in continuous learning through online platforms and certifications, including AWS certifications and React specializations. He's also active in developer communities."
        
        elif any(word in query_lower for word in ['contact', 'hire', 'available', 'reach']):
            return f"K Sree Charan is available for freelance projects and full-time opportunities. He's open to collaboration on interesting projects. You can contact him through the portfolio website's contact form, and he's also active on professional networks and GitHub."
        
        elif any(word in query_lower for word in ['who', 'about', 'introduce']):
            return f"K Sree Charan is a passionate Full Stack Developer with expertise in modern web technologies. He specializes in React, Node.js, Python, and various databases. He has a problem-solving mindset, is a fast learner, great team collaborator, and creative innovator who loves tackling complex problems and turning ideas into reality through clean, efficient code."
        
        else:
            # Default response using context
            return f"Based on the information available, {context[:200]}... Feel free to ask me about K Sree Charan's skills, experience, projects, education, or how to contact him!"

# Global chatbot instance
portfolio_chatbot = PortfolioRAGChatbot()
