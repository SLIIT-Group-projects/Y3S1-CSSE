class RecordFactory {
    
    static createRecord({ doctorId, userId, records, prescription, specialNotes }) {
      return {
        doctorId,
        userId,
        records,
        prescription,
        specialNotes,
      };
    }
    
  }
  
  module.exports = RecordFactory;